<?php

namespace Database\Factories;

use App\Models\GuidanceSchedule;
use App\Models\ThesisSubmission;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GuidanceSchedule>
 */
class GuidanceScheduleFactory extends Factory
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
        
        return [
            'thesis_submission_id' => $thesisSubmission->id,
            'supervisor_id' => $thesisSubmission->supervisor_id,
            'student_id' => $thesisSubmission->student_id,
            'scheduled_at' => fake()->dateTimeBetween('now', '+1 month'),
            'status' => fake()->randomElement(['scheduled', 'completed', 'cancelled', 'rescheduled']),
            'agenda' => fake()->sentence(),
            'location' => fake()->randomElement(['Ruang Dosen A101', 'Lab Komputer B202', 'Perpustakaan Lt. 3', 'Online via Zoom']),
            'meeting_notes' => fake()->optional()->paragraphs(2, true),
            'feedback' => fake()->optional()->sentence(),
            'next_steps' => fake()->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the schedule is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'meeting_notes' => fake()->paragraphs(2, true),
            'feedback' => fake()->sentence(),
            'next_steps' => fake()->sentence(),
            'scheduled_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ]);
    }

    /**
     * Indicate that the schedule is upcoming.
     */
    public function upcoming(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'scheduled',
            'meeting_notes' => null,
            'feedback' => null,
            'next_steps' => null,
            'scheduled_at' => fake()->dateTimeBetween('now', '+1 month'),
        ]);
    }
}