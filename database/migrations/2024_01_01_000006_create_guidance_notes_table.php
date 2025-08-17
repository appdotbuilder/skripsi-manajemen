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
        Schema::create('guidance_notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('thesis_submission_id')->constrained()->onDelete('cascade');
            $table->foreignId('guidance_schedule_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('supervisor_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->text('content');
            $table->text('feedback')->nullable();
            $table->text('recommendations')->nullable();
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            $table->boolean('is_read')->default(false);
            $table->timestamps();
            
            $table->index(['thesis_submission_id', 'created_at']);
            $table->index(['student_id', 'is_read']);
            $table->index(['supervisor_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guidance_notes');
    }
};