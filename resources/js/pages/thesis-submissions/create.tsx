import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import InputError from '@/components/input-error';
import Heading from '@/components/heading';

export default function CreateThesisSubmission() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('thesis-submissions.store'));
    };

    return (
        <AppLayout>
            <Head title="Ajukan Judul Skripsi" />
            
            <div className="space-y-8">
                <Heading
                    title="📝 Ajukan Judul Skripsi"
                    description="Mulai perjalanan skripsi Anda dengan mengajukan judul dan deskripsi penelitian"
                />

                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>📋 Form Pengajuan Skripsi</CardTitle>
                        <CardDescription>
                            Isilah form di bawah ini dengan lengkap dan jelas. Pastikan judul dan deskripsi 
                            penelitian sesuai dengan bidang studi Anda.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title Field */}
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-medium text-gray-700">
                                    🎯 Judul Skripsi <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    rows={3}
                                    placeholder="Masukkan judul skripsi yang spesifik dan jelas..."
                                    required
                                />
                                <InputError message={errors.title} />
                                <p className="text-xs text-gray-500">
                                    💡 Tip: Gunakan judul yang spesifik, jelas, dan menggambarkan penelitian Anda
                                </p>
                            </div>

                            {/* Description Field */}
                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                                    📄 Deskripsi Penelitian <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows={6}
                                    placeholder="Jelaskan latar belakang, tujuan, metode, dan kontribusi penelitian Anda..."
                                    required
                                />
                                <InputError message={errors.description} />
                                <p className="text-xs text-gray-500">
                                    💡 Tip: Jelaskan latar belakang masalah, tujuan penelitian, metode yang akan digunakan, dan kontribusi yang diharapkan
                                </p>
                            </div>

                            {/* Guidelines */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h4 className="font-medium text-blue-900 mb-2">📌 Panduan Pengajuan:</h4>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>✅ Pastikan judul belum pernah digunakan sebelumnya</li>
                                    <li>✅ Judul harus sesuai dengan bidang studi dan minat Anda</li>
                                    <li>✅ Deskripsi minimal 200 kata dengan penjelasan yang jelas</li>
                                    <li>✅ Sertakan rujukan/referensi awal jika diperlukan</li>
                                    <li>✅ Pengajuan akan direview oleh koordinator program studi</li>
                                </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                <a
                                    href="/dashboard"
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                >
                                    ← Kembali ke Dashboard
                                </a>
                                <div className="flex items-center space-x-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setData({
                                                title: '',
                                                description: '',
                                            });
                                        }}
                                    >
                                        🔄 Reset
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="min-w-[140px]"
                                    >
                                        {processing ? (
                                            <>
                                                ⏳ Mengajukan...
                                            </>
                                        ) : (
                                            <>
                                                🚀 Ajukan Skripsi
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Additional Info */}
                <Card className="max-w-2xl mx-auto bg-gray-50">
                    <CardContent className="p-6">
                        <h4 className="font-medium text-gray-900 mb-3">ℹ️ Informasi Tambahan</h4>
                        <div className="text-sm text-gray-600 space-y-2">
                            <p>
                                <strong>📅 Waktu Review:</strong> Pengajuan akan direview dalam 3-5 hari kerja
                            </p>
                            <p>
                                <strong>📧 Notifikasi:</strong> Anda akan mendapat notifikasi via email tentang status pengajuan
                            </p>
                            <p>
                                <strong>🔄 Revisi:</strong> Jika diperlukan revisi, Anda dapat mengedit pengajuan sebelum disetujui
                            </p>
                            <p>
                                <strong>👨‍🏫 Pembimbing:</strong> Pembimbing akan ditentukan setelah pengajuan disetujui
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}