<?php

namespace Database\Seeders;

use App\Models\ThesisSubmission;
use App\Models\User;
use Illuminate\Database\Seeder;

class ThesisSubmissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = User::where('role', 'student')->get();
        $supervisors = User::where('role', 'supervisor')->get();

        $submissions = [
            [
                'student_id' => $students->where('student_id', '2020110001')->first()->id,
                'supervisor_id' => $supervisors->first()->id,
                'title' => 'Sistem Informasi Manajemen Inventori Berbasis Web dengan Teknologi Laravel dan MySQL',
                'description' => 'Penelitian ini bertujuan untuk mengembangkan sistem informasi manajemen inventori yang dapat membantu perusahaan dalam mengelola stok barang secara efisien. Sistem akan dibangun menggunakan framework Laravel dengan database MySQL untuk menyimpan data inventori. Fitur utama meliputi pencatatan barang masuk dan keluar, laporan stok, dan notifikasi stok minimum.',
                'status' => 'approved',
                'approved_at' => now()->subDays(30),
                'progress_percentage' => 75,
                'created_at' => now()->subDays(45),
                'updated_at' => now()->subDays(5),
            ],
            [
                'student_id' => $students->where('student_id', '2020110002')->first()->id,
                'supervisor_id' => $supervisors->skip(1)->first()->id,
                'title' => 'Implementasi Algoritma Machine Learning untuk Prediksi Penjualan Menggunakan Python',
                'description' => 'Penelitian ini fokus pada implementasi algoritma machine learning untuk memprediksi penjualan produk berdasarkan data historis. Akan menggunakan algoritma seperti Linear Regression, Random Forest, dan Neural Network. Sistem akan dibangun menggunakan Python dengan library scikit-learn dan TensorFlow.',
                'status' => 'in_progress',
                'approved_at' => now()->subDays(20),
                'progress_percentage' => 45,
                'created_at' => now()->subDays(35),
                'updated_at' => now()->subDays(3),
            ],
            [
                'student_id' => $students->where('student_id', '2020110003')->first()->id,
                'title' => 'Analisis dan Perancangan Sistem Keamanan Jaringan Menggunakan Teknologi Firewall',
                'description' => 'Penelitian ini akan menganalisis kebutuhan keamanan jaringan pada organisasi dan merancang implementasi firewall yang tepat. Mencakup analisis traffic jaringan, identifikasi ancaman keamanan, dan implementasi aturan firewall yang optimal untuk melindungi infrastruktur TI.',
                'status' => 'pending',
                'created_at' => now()->subDays(10),
                'updated_at' => now()->subDays(10),
            ],
            [
                'student_id' => $students->where('student_id', '2021110001')->first()->id,
                'supervisor_id' => $supervisors->first()->id,
                'title' => 'Pengembangan Aplikasi Mobile E-Learning Berbasis Android dengan Fitur Gamifikasi',
                'description' => 'Penelitian ini akan mengembangkan aplikasi mobile learning berbasis Android yang dilengkapi dengan fitur gamifikasi untuk meningkatkan engagement siswa. Aplikasi akan mencakup fitur quiz, badge system, leaderboard, dan progress tracking untuk membuat proses belajar lebih menarik dan interaktif.',
                'status' => 'approved',
                'approved_at' => now()->subDays(15),
                'progress_percentage' => 25,
                'created_at' => now()->subDays(25),
                'updated_at' => now()->subDays(2),
            ],
            [
                'student_id' => $students->where('student_id', '2021110002')->first()->id,
                'title' => 'Sistem Rekomendasi Film Menggunakan Collaborative Filtering dan Content-Based Filtering',
                'description' => 'Penelitian ini bertujuan untuk membangun sistem rekomendasi film yang menggabungkan pendekatan collaborative filtering dan content-based filtering. Sistem akan menganalisis preferensi pengguna dan karakteristik film untuk memberikan rekomendasi yang akurat dan personal.',
                'status' => 'pending',
                'created_at' => now()->subDays(5),
                'updated_at' => now()->subDays(5),
            ],
        ];

        foreach ($submissions as $submission) {
            ThesisSubmission::create($submission);
        }
    }
}