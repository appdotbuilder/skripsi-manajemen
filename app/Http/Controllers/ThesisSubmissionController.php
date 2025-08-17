<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreThesisSubmissionRequest;
use App\Http\Requests\UpdateThesisSubmissionRequest;
use App\Models\ThesisSubmission;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ThesisSubmissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        if ($user->isStudent()) {
            $submissions = $user->thesisSubmissions()
                ->with('supervisor')
                ->latest()
                ->paginate(10);
        } elseif ($user->isSupervisor()) {
            $submissions = $user->supervisions()
                ->with('student')
                ->latest()
                ->paginate(10);
        } else {
            $submissions = ThesisSubmission::with(['student', 'supervisor'])
                ->latest()
                ->paginate(10);
        }
        
        return Inertia::render('thesis-submissions/index', [
            'submissions' => $submissions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('thesis-submissions/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreThesisSubmissionRequest $request)
    {
        $thesisSubmission = ThesisSubmission::create([
            'student_id' => $request->user()->id,
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return redirect()->route('thesis-submissions.show', $thesisSubmission)
            ->with('success', 'Thesis submission created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ThesisSubmission $thesisSubmission)
    {
        $thesisSubmission->load(['student', 'supervisor', 'guidanceSchedules.supervisor', 'guidanceNotes.supervisor']);
        
        return Inertia::render('thesis-submissions/show', [
            'submission' => $thesisSubmission,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ThesisSubmission $thesisSubmission)
    {
        $supervisors = User::supervisors()->get();
        
        return Inertia::render('thesis-submissions/edit', [
            'submission' => $thesisSubmission,
            'supervisors' => $supervisors,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateThesisSubmissionRequest $request, ThesisSubmission $thesisSubmission)
    {
        $thesisSubmission->update($request->validated());

        return redirect()->route('thesis-submissions.show', $thesisSubmission)
            ->with('success', 'Thesis submission updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ThesisSubmission $thesisSubmission)
    {
        $thesisSubmission->delete();

        return redirect()->route('thesis-submissions.index')
            ->with('success', 'Thesis submission deleted successfully.');
    }


}