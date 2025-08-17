<?php

namespace Database\Factories;

use App\Models\GuidanceNote;
use App\Models\GuidanceSchedule;
use App\Models\ThesisSubmission;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GuidanceNote>
 */
class GuidanceNoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $thesisSubmission = ThesisSubmission::where('status', '!=', 'pending')->inRandomOrder()->first();
        if (!$thesisSubmission) {
            $thesisSubmission = ThesisSubmission::factory()->approved()->create();
        }
        
        $guidanceSchedule = GuidanceSchedule::where('thesis_submission_id', $thesisSubmission->id)->inRandomOrder()->first();
        
        return [
            'thesis_submission_id' => $thesisSubmission->id,
            'guidance_schedule_id' => $guidanceSchedule?->id,
            'supervisor_id' => $thesisSubmission->supervisor_id,
            'student_id' => $thesisSubmission->student_id,
            'content' => fake()->paragraphs(2, true),
            'feedback' => fake()->optional()->sentence(),
            'recommendations' => fake()->optional()->sentence(),
            'priority' => fake()->randomElement(['low', 'medium', 'high']),
            'is_read' => fake()->boolean(70),
        ];
    }

    /**
     * Indicate that the note is unread.
     */
    public function unread(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_read' => false,
        ]);
    }

    /**
     * Indicate that the note has high priority.
     */
    public function highPriority(): static
    {
        return $this->state(fn (array $attributes) => [
            'priority' => 'high',
        ]);
    }
}