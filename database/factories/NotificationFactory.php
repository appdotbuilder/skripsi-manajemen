<?php

namespace Database\Factories;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = [
            'thesis_submitted' => 'Pengajuan Skripsi Diterima',
            'thesis_approved' => 'Pengajuan Skripsi Disetujui',
            'thesis_rejected' => 'Pengajuan Skripsi Ditolak',
            'schedule_created' => 'Jadwal Bimbingan Baru',
            'schedule_updated' => 'Jadwal Bimbingan Diperbarui',
            'note_created' => 'Catatan Bimbingan Baru',
            'deadline_reminder' => 'Pengingat Deadline',
        ];

        $type = fake()->randomElement(array_keys($types));
        $title = $types[$type];

        $messages = [
            'thesis_submitted' => 'Pengajuan skripsi Anda telah diterima dan sedang dalam proses review.',
            'thesis_approved' => 'Selamat! Pengajuan skripsi Anda telah disetujui dan pembimbing telah ditentukan.',
            'thesis_rejected' => 'Pengajuan skripsi Anda memerlukan revisi. Silakan periksa komentar dari reviewer.',
            'schedule_created' => 'Jadwal bimbingan baru telah dibuat. Silakan periksa detail jadwal Anda.',
            'schedule_updated' => 'Jadwal bimbingan telah diperbarui. Silakan periksa perubahan yang terjadi.',
            'note_created' => 'Catatan bimbingan baru telah ditambahkan oleh pembimbing Anda.',
            'deadline_reminder' => 'Pengingat: Anda memiliki deadline yang akan segera berakhir.',
        ];

        $user = User::inRandomOrder()->first() ?? User::factory()->create();
        
        return [
            'user_id' => $user->id,
            'type' => $type,
            'title' => $title,
            'message' => $messages[$type],
            'data' => fake()->optional()->randomElements([
                'thesis_id' => fake()->numberBetween(1, 10),
                'schedule_id' => fake()->numberBetween(1, 10),
                'url' => fake()->url(),
            ]),
            'is_read' => fake()->boolean(60),
            'read_at' => fake()->optional(60)->dateTimeBetween('-1 month', 'now'),
        ];
    }

    /**
     * Indicate that the notification is unread.
     */
    public function unread(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_read' => false,
            'read_at' => null,
        ]);
    }
}