<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\GuidanceSchedule
 *
 * @property int $id
 * @property int $thesis_submission_id
 * @property int $supervisor_id
 * @property int $student_id
 * @property \Illuminate\Support\Carbon $scheduled_at
 * @property string $status
 * @property string|null $agenda
 * @property string|null $location
 * @property string|null $meeting_notes
 * @property string|null $feedback
 * @property string|null $next_steps
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|GuidanceSchedule newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GuidanceSchedule newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GuidanceSchedule query()
 * @method static \Database\Factories\GuidanceScheduleFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class GuidanceSchedule extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'thesis_submission_id',
        'supervisor_id',
        'student_id',
        'scheduled_at',
        'status',
        'agenda',
        'location',
        'meeting_notes',
        'feedback',
        'next_steps',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'scheduled_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the thesis submission.
     */
    public function thesisSubmission(): BelongsTo
    {
        return $this->belongsTo(ThesisSubmission::class);
    }

    /**
     * Get the supervisor.
     */
    public function supervisor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'supervisor_id');
    }

    /**
     * Get the student.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    /**
     * Get guidance notes for this schedule.
     */
    public function guidanceNotes(): HasMany
    {
        return $this->hasMany(GuidanceNote::class);
    }
}