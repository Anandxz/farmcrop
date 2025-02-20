import React, { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';

export function DiseaseDetection() {
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ disease: string; confidence: number; treatment: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Simulate API call
      setIsLoading(true);
      setTimeout(() => {
        setResult({
          disease: "Leaf Blight",
          confidence: 92.5,
          treatment: "Apply copper-based fungicide early in the morning. Ensure proper spacing between plants for better air circulation."
        });
        setIsLoading(false);
      }, 2000);
    }
  };

  const resetForm = () => {
    setPreview(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Crop Disease Detection</h2>
      
      {!preview && (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-green-500 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Click or drag and drop to upload an image of your crop</p>
          <p className="text-sm text-gray-500 mt-2">Supported formats: JPG, PNG (max 5MB)</p>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      )}

      {preview && (
        <div className="space-y-6">
          <div className="relative">
            <img src={preview} alt="Preview" className="w-full rounded-lg" />
            <button
              onClick={resetForm}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 text-green-600 animate-spin mx-auto" />
              <p className="mt-2 text-gray-600">Analyzing your image...</p>
            </div>
          ) : result && (
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900">Analysis Results</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-gray-600">Detected Disease:</p>
                  <p className="text-lg font-medium text-gray-900">{result.disease}</p>
                </div>
                <div>
                  <p className="text-gray-600">Confidence:</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{result.confidence}% confidence</p>
                </div>
                <div>
                  <p className="text-gray-600">Recommended Treatment:</p>
                  <p className="text-gray-900">{result.treatment}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}