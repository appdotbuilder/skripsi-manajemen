<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin User
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@simbim.ac.id',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Supervisor Users
        User::create([
            'name' => 'Dr. Ahmad Hidayat, S.Kom., M.T.',
            'email' => 'ahmad.hidayat@simbim.ac.id',
            'password' => Hash::make('password'),
            'role' => 'supervisor',
            'department' => 'Teknik Informatika',
            'phone' => '081234567890',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Prof. Dr. Siti Rahmawati, S.Kom., M.Kom.',
            'email' => 'siti.rahmawati@simbim.ac.id',
            'password' => Hash::make('password'),
            'role' => 'supervisor',
            'department' => 'Sistem Informasi',
            'phone' => '081234567891',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Dr. Ir. Bambang Sutrisno, M.T.',
            'email' => 'bambang.sutrisno@simbim.ac.id',
            'password' => Hash::make('password'),
            'role' => 'supervisor',
            'department' => 'Teknik Komputer',
            'phone' => '081234567892',
            'email_verified_at' => now(),
        ]);

        // Student Users
        User::create([
            'name' => 'Budi Santoso',
            'email' => 'budi.santoso@mahasiswa.simbim.ac.id',
            'password' => Hash::make('password'),
            'role' => 'student',
            'student_id' => '2020110001',
            'department' => 'Teknik Informatika',
            'entry_year' => 2020,
            'phone' => '081234567893',
            'address' => 'Jl. Merdeka No. 123, Jakarta',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Sari Dewi',
            'email' => 'sari.dewi@mahasiswa.simbim.ac.id',
            'password' => Hash::make('password'),
            'role' => 'student',
            'student_id' => '2020110002',
            'department' => 'Sistem Informasi',
            'entry_year' => 2020,
            'phone' => '081234567894',
            'address' => 'Jl. Sudirman No. 456, Bandung',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Andi Wijaya',
            'email' => 'andi.wijaya@mahasiswa.simbim.ac.id',
            'password' => Hash::make('password'),
            'role' => 'student',
            'student_id' => '2020110003',
            'department' => 'Teknik Komputer',
            'entry_year' => 2020,
            'phone' => '081234567895',
            'address' => 'Jl. Gatot Subroto No. 789, Surabaya',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Maya Putri',
            'email' => 'maya.putri@mahasiswa.simbim.ac.id',
            'password' => Hash::make('password'),
            'role' => 'student',
            'student_id' => '2021110001',
            'department' => 'Teknik Informatika',
            'entry_year' => 2021,
            'phone' => '081234567896',
            'address' => 'Jl. Diponegoro No. 321, Yogyakarta',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Rizki Pratama',
            'email' => 'rizki.pratama@mahasiswa.simbim.ac.id',
            'password' => Hash::make('password'),
            'role' => 'student',
            'student_id' => '2021110002',
            'department' => 'Sistem Informasi',
            'entry_year' => 2021,
            'phone' => '081234567897',
            'address' => 'Jl. Ahmad Yani No. 654, Semarang',
            'email_verified_at' => now(),
        ]);
    }
}