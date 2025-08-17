<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string $role
 * @property string|null $student_id
 * @property string|null $phone
 * @property string|null $address
 * @property string|null $department
 * @property int|null $entry_year
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User students()
 * @method static \Illuminate\Database\Eloquent\Builder|User supervisors()
 * @method static \Illuminate\Database\Eloquent\Builder|User admins()
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'student_id',
        'phone',
        'address',
        'department',
        'entry_year',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'entry_year' => 'integer',
        ];
    }

    /**
     * Get thesis submissions for students.
     */
    public function thesisSubmissions(): HasMany
    {
        return $this->hasMany(ThesisSubmission::class, 'student_id');
    }

    /**
     * Get thesis supervisions for supervisors.
     */
    public function supervisions(): HasMany
    {
        return $this->hasMany(ThesisSubmission::class, 'supervisor_id');
    }

    /**
     * Get guidance schedules as student.
     */
    public function guidanceSchedulesAsStudent(): HasMany
    {
        return $this->hasMany(GuidanceSchedule::class, 'student_id');
    }

    /**
     * Get guidance schedules as supervisor.
     */
    public function guidanceSchedulesAsSupervisor(): HasMany
    {
        return $this->hasMany(GuidanceSchedule::class, 'supervisor_id');
    }

    /**
     * Get guidance notes as student.
     */
    public function guidanceNotesAsStudent(): HasMany
    {
        return $this->hasMany(GuidanceNote::class, 'student_id');
    }

    /**
     * Get guidance notes as supervisor.
     */
    public function guidanceNotesAsSupervisor(): HasMany
    {
        return $this->hasMany(GuidanceNote::class, 'supervisor_id');
    }

    /**
     * Get user notifications.
     */
    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    /**
     * Scope query to students only.
     */
    public function scopeStudents($query)
    {
        return $query->where('role', 'student');
    }

    /**
     * Scope query to supervisors only.
     */
    public function scopeSupervisors($query)
    {
        return $query->where('role', 'supervisor');
    }

    /**
     * Scope query to admins only.
     */
    public function scopeAdmins($query)
    {
        return $query->where('role', 'admin');
    }

    /**
     * Check if user is a student.
     */
    public function isStudent(): bool
    {
        return $this->role === 'student';
    }

    /**
     * Check if user is a supervisor.
     */
    public function isSupervisor(): bool
    {
        return $this->role === 'supervisor';
    }

    /**
     * Check if user is an admin.
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }
}