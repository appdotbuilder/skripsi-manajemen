<?php

namespace Database\Factories;

use App\Models\ThesisSubmission;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ThesisSubmission>
 */
class ThesisSubmissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = fake()->randomElement(['pending', 'approved', 'rejected', 'in_progress', 'completed']);
        
        $student = User::where('role', 'student')->inRandomOrder()->first() ?? User::factory()->student()->create();
        $supervisor = null;
        if ($status !== 'pending') {
            $supervisor = User::where('role', 'supervisor')->inRandomOrder()->first() ?? User::factory()->supervisor()->create();
        }
        
        return [
            'student_id' => $student->id,
            'supervisor_id' => $supervisor?->id,
            'title' => fake()->sentence(8),
            'description' => fake()->paragraphs(3, true),
            'status' => $status,
            'rejection_reason' => $status === 'rejected' ? fake()->sentence() : null,
            'approved_at' => $status !== 'pending' && $status !== 'rejected' ? fake()->dateTimeBetween('-2 months') : null,
            'deadline' => $status === 'approved' || $status === 'in_progress' ? fake()->dateTimeBetween('now', '+1 year') : null,
            'progress_percentage' => $status === 'in_progress' ? fake()->numberBetween(0, 99) : ($status === 'completed' ? 100 : 0),
            'final_grade' => $status === 'completed' ? fake()->randomFloat(2, 60, 100) : null,
        ];
    }

    /**
     * Indicate that the submission is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'supervisor_id' => null,
            'approved_at' => null,
            'deadline' => null,
            'progress_percentage' => 0,
            'final_grade' => null,
            'rejection_reason' => null,
        ]);
    }

    /**
     * Indicate that the submission is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
            'supervisor_id' => User::factory()->supervisor(),
            'approved_at' => fake()->dateTimeBetween('-1 month'),
            'deadline' => fake()->dateTimeBetween('now', '+1 year'),
            'progress_percentage' => 0,
            'final_grade' => null,
            'rejection_reason' => null,
        ]);
    }

    /**
     * Indicate that the submission is in progress.
     */
    public function inProgress(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'in_progress',
            'supervisor_id' => User::factory()->supervisor(),
            'approved_at' => fake()->dateTimeBetween('-2 months'),
            'deadline' => fake()->dateTimeBetween('now', '+1 year'),
            'progress_percentage' => fake()->numberBetween(1, 99),
            'final_grade' => null,
            'rejection_reason' => null,
        ]);
    }

    /**
     * Indicate that the submission is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'supervisor_id' => User::factory()->supervisor(),
            'approved_at' => fake()->dateTimeBetween('-6 months', '-3 months'),
            'deadline' => fake()->dateTimeBetween('-3 months', '-1 month'),
            'progress_percentage' => 100,
            'final_grade' => fake()->randomFloat(2, 70, 100),
            'rejection_reason' => null,
        ]);
    }
}