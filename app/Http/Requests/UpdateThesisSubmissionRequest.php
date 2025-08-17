<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateThesisSubmissionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->user();
        $submission = $this->route('thesis_submission');
        
        return $user && (
            $user->isAdmin() || 
            ($user->isSupervisor() && $submission->supervisor_id === $user->id) ||
            ($user->isStudent() && $submission->student_id === $user->id && $submission->status === 'pending')
        );
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string|max:2000',
        ];

        // Additional rules for supervisors and admins
        if ($this->user()->isSupervisor() || $this->user()->isAdmin()) {
            $rules['progress_percentage'] = 'sometimes|integer|min:0|max:100';
            $rules['final_grade'] = 'sometimes|nullable|numeric|min:0|max:100';
            $rules['status'] = 'sometimes|in:pending,approved,rejected,in_progress,completed';
            $rules['supervisor_id'] = 'sometimes|nullable|exists:users,id';
        }

        return $rules;
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Thesis title is required.',
            'title.max' => 'Thesis title must not exceed 255 characters.',
            'description.required' => 'Thesis description is required.',
            'description.max' => 'Description must not exceed 2000 characters.',
            'progress_percentage.integer' => 'Progress must be a valid percentage.',
            'progress_percentage.min' => 'Progress cannot be less than 0%.',
            'progress_percentage.max' => 'Progress cannot be more than 100%.',
            'final_grade.numeric' => 'Grade must be a valid number.',
            'final_grade.min' => 'Grade cannot be less than 0.',
            'final_grade.max' => 'Grade cannot be more than 100.',
        ];
    }
}