<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'role' => fake()->randomElement(['student', 'supervisor', 'admin']),
            'student_id' => null,
            'phone' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'department' => fake()->randomElement(['Teknik Informatika', 'Sistem Informasi', 'Teknik Komputer']),
            'entry_year' => null,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Create a student user.
     */
    public function student(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'student',
            'student_id' => fake()->unique()->numerify('########'),
            'department' => fake()->randomElement(['Teknik Informatika', 'Sistem Informasi', 'Teknik Komputer']),
            'entry_year' => fake()->numberBetween(2018, 2023),
        ]);
    }

    /**
     * Create a supervisor user.
     */
    public function supervisor(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'supervisor',
            'student_id' => null,
            'department' => fake()->randomElement(['Teknik Informatika', 'Sistem Informasi', 'Teknik Komputer']),
            'entry_year' => null,
        ]);
    }

    /**
     * Create an admin user.
     */
    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'admin',
            'student_id' => null,
            'department' => 'Administration',
            'entry_year' => null,
        ]);
    }
}
