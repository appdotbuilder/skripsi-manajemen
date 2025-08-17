<?php

namespace App\Http\Controllers;

use App\Models\GuidanceSchedule;
use App\Models\ThesisSubmission;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard based on user role.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        if ($user->isStudent()) {
            return $this->studentDashboard($user);
        } elseif ($user->isSupervisor()) {
            return $this->supervisorDashboard($user);
        } elseif ($user->isAdmin()) {
            return $this->adminDashboard($user);
        }
        
        return redirect()->route('welcome');
    }

    /**
     * Display student dashboard.
     */
    protected function studentDashboard(User $user)
    {
        $thesisSubmission = $user->thesisSubmissions()->latest()->first();
        $upcomingSchedules = $user->guidanceSchedulesAsStudent()
            ->where('scheduled_at', '>', now())
            ->with(['supervisor', 'thesisSubmission'])
            ->orderBy('scheduled_at')
            ->limit(5)
            ->get();
        
        $recentNotes = $user->guidanceNotesAsStudent()
            ->with(['supervisor', 'thesisSubmission'])
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('student-dashboard', [
            'thesisSubmission' => $thesisSubmission,
            'upcomingSchedules' => $upcomingSchedules,
            'recentNotes' => $recentNotes,
        ]);
    }

    /**
     * Display supervisor dashboard.
     */
    protected function supervisorDashboard(User $user)
    {
        $supervisions = $user->supervisions()
            ->with('student')
            ->get();
        
        $upcomingSchedules = $user->guidanceSchedulesAsSupervisor()
            ->where('scheduled_at', '>', now())
            ->with(['student', 'thesisSubmission'])
            ->orderBy('scheduled_at')
            ->limit(10)
            ->get();
        
        $pendingNotes = $user->guidanceNotesAsSupervisor()
            ->where('is_read', false)
            ->with(['student', 'thesisSubmission'])
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('supervisor-dashboard', [
            'supervisions' => $supervisions,
            'upcomingSchedules' => $upcomingSchedules,
            'pendingNotes' => $pendingNotes,
        ]);
    }

    /**
     * Display admin dashboard.
     */
    protected function adminDashboard(User $user)
    {
        $stats = [
            'total_students' => User::students()->count(),
            'total_supervisors' => User::supervisors()->count(),
            'total_submissions' => ThesisSubmission::count(),
            'pending_submissions' => ThesisSubmission::where('status', 'pending')->count(),
            'approved_submissions' => ThesisSubmission::where('status', 'approved')->count(),
            'completed_submissions' => ThesisSubmission::where('status', 'completed')->count(),
        ];

        $recentSubmissions = ThesisSubmission::with(['student', 'supervisor'])
            ->latest()
            ->limit(10)
            ->get();

        $upcomingSchedules = GuidanceSchedule::with(['student', 'supervisor', 'thesisSubmission'])
            ->where('scheduled_at', '>', now())
            ->orderBy('scheduled_at')
            ->limit(10)
            ->get();

        return Inertia::render('admin-dashboard', [
            'stats' => $stats,
            'recentSubmissions' => $recentSubmissions,
            'upcomingSchedules' => $upcomingSchedules,
        ]);
    }
}