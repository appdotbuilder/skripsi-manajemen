<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\ThesisSubmission
 *
 * @property int $id
 * @property int $student_id
 * @property int|null $supervisor_id
 * @property string $title
 * @property string $description
 * @property string $status
 * @property string|null $rejection_reason
 * @property string|null $approved_at
 * @property string|null $deadline
 * @property int $progress_percentage
 * @property float|null $final_grade
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ThesisSubmission newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ThesisSubmission newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ThesisSubmission query()
 * @method static \Database\Factories\ThesisSubmissionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ThesisSubmission extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'student_id',
        'supervisor_id',
        'title',
        'description',
        'status',
        'rejection_reason',
        'approved_at',
        'deadline',
        'progress_percentage',
        'final_grade',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'approved_at' => 'date',
        'deadline' => 'date',
        'progress_percentage' => 'integer',
        'final_grade' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the student that owns the thesis submission.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    /**
     * Get the supervisor assigned to the thesis.
     */
    public function supervisor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'supervisor_id');
    }

    /**
     * Get guidance schedules for this thesis.
     */
    public function guidanceSchedules(): HasMany
    {
        return $this->hasMany(GuidanceSchedule::class);
    }

    /**
     * Get guidance notes for this thesis.
     */
    public function guidanceNotes(): HasMany
    {
        return $this->hasMany(GuidanceNote::class);
    }
}