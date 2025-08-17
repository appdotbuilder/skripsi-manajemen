<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\GuidanceNote
 *
 * @property int $id
 * @property int $thesis_submission_id
 * @property int|null $guidance_schedule_id
 * @property int $supervisor_id
 * @property int $student_id
 * @property string $content
 * @property string|null $feedback
 * @property string|null $recommendations
 * @property string $priority
 * @property bool $is_read
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|GuidanceNote newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GuidanceNote newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GuidanceNote query()
 * @method static \Database\Factories\GuidanceNoteFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class GuidanceNote extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'thesis_submission_id',
        'guidance_schedule_id',
        'supervisor_id',
        'student_id',
        'content',
        'feedback',
        'recommendations',
        'priority',
        'is_read',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_read' => 'boolean',
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
     * Get the guidance schedule.
     */
    public function guidanceSchedule(): BelongsTo
    {
        return $this->belongsTo(GuidanceSchedule::class);
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
}