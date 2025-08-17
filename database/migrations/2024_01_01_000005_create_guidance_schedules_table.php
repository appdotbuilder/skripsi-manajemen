<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('guidance_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('thesis_submission_id')->constrained()->onDelete('cascade');
            $table->foreignId('supervisor_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->dateTime('scheduled_at');
            $table->enum('status', ['scheduled', 'completed', 'cancelled', 'rescheduled'])->default('scheduled');
            $table->text('agenda')->nullable();
            $table->text('location')->nullable();
            $table->text('meeting_notes')->nullable();
            $table->text('feedback')->nullable();
            $table->text('next_steps')->nullable();
            $table->timestamps();
            
            $table->index(['supervisor_id', 'scheduled_at']);
            $table->index(['student_id', 'scheduled_at']);
            $table->index(['thesis_submission_id', 'scheduled_at']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guidance_schedules');
    }
};