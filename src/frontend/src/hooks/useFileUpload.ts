import { useState, useCallback } from 'react';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export function useFileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    // Validate file type
    const validExtensions = ['.doc', '.docx'];
    const fileName = file.name.toLowerCase();
    const isValid = validExtensions.some(ext => fileName.endsWith(ext));

    if (!isValid) {
      setErrorMessage('Invalid file type. Please upload a .doc or .docx file.');
      setUploadStatus('error');
      return;
    }

    setSelectedFile(file);
    setUploadStatus('success');
    setErrorMessage(null);
    setUploadProgress(0);
  }, []);

  const processFile = useCallback(async (): Promise<string[] | null> => {
    if (!selectedFile) return null;

    setUploadStatus('uploading');
    setUploadProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Read file as text (simplified parsing)
      const text = await selectedFile.text();
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Parse requirements from text
      // Split by lines and filter out empty lines
      const lines = text
        .split(/[\r\n]+/)
        .map(line => line.trim())
        .filter(line => line.length > 0);

      // Extract meaningful requirements (lines with sufficient length)
      const requirements = lines
        .filter(line => line.length > 10 && !line.match(/^[^a-zA-Z]*$/))
        .slice(0, 20); // Limit to first 20 requirements

      if (requirements.length === 0) {
        throw new Error('No valid requirements found in document');
      }

      setUploadStatus('success');
      return requirements;
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to process file');
      return null;
    }
  }, [selectedFile]);

  return {
    selectedFile,
    uploadProgress,
    uploadStatus,
    errorMessage,
    handleFileSelect,
    processFile,
  };
}
