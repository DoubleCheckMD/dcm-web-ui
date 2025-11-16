/**
 * Mock Upload Service
 * Returns fake data for testing without a backend
 */

const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Mock uploaded documents storage
let mockDocuments = [
  {
    id: 'doc-1',
    name: 'medical-report-2024.pdf',
    size: 2457600,
    type: 'application/pdf',
    uploadedAt: new Date('2024-10-01').toISOString(),
    url: '/mock/document-1.pdf',
  },
  {
    id: 'doc-2',
    name: 'lab-results.pdf',
    size: 1234567,
    type: 'application/pdf',
    uploadedAt: new Date('2024-10-05').toISOString(),
    url: '/mock/document-2.pdf',
  },
];

const mockUploadService = {
  /**
   * Mock upload files
   */
  uploadFiles: async (files) => {
    await delay();
    
    if (!files || files.length === 0) {
      throw {
        response: {
          status: 400,
          data: { message: 'No files provided' }
        }
      };
    }

    // Simulate file processing
    const uploadedFiles = files.map((file, index) => ({
      id: `doc-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
      url: `/mock/${file.name}`,
    }));

    // Add to mock storage
    mockDocuments = [...mockDocuments, ...uploadedFiles];
    
    console.log('📁 [MOCK] Files uploaded:', uploadedFiles);
    
    return {
      status: 200,
      data: {
        message: 'Files uploaded successfully (Mock Mode)',
        files: uploadedFiles,
        count: uploadedFiles.length,
      }
    };
  },

  /**
   * Mock upload single file
   */
  uploadSingleFile: async (file, fieldName = 'file') => {
    await delay();
    
    if (!file) {
      throw {
        response: {
          status: 400,
          data: { message: 'No file provided' }
        }
      };
    }

    const uploadedFile = {
      id: `doc-${Date.now()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
      url: `/mock/${file.name}`,
      fieldName,
    };

    mockDocuments.push(uploadedFile);
    
    console.log('📁 [MOCK] File uploaded:', uploadedFile);
    
    return {
      status: 200,
      data: {
        message: 'File uploaded successfully (Mock Mode)',
        file: uploadedFile,
      }
    };
  },

  /**
   * Mock get documents
   */
  getDocuments: async () => {
    await delay(400);
    
    console.log('📁 [MOCK] Fetching documents:', mockDocuments);
    
    return {
      status: 200,
      data: {
        documents: mockDocuments,
        total: mockDocuments.length,
      }
    };
  },

  /**
   * Mock delete document
   */
  deleteDocument: async (documentId) => {
    await delay(300);
    
    const index = mockDocuments.findIndex(doc => doc.id === documentId);
    
    if (index === -1) {
      throw {
        response: {
          status: 404,
          data: { message: 'Document not found' }
        }
      };
    }

    const deletedDoc = mockDocuments.splice(index, 1)[0];
    
    console.log('🗑️ [MOCK] Document deleted:', deletedDoc);
    
    return {
      status: 200,
      data: {
        message: 'Document deleted successfully (Mock Mode)',
        document: deletedDoc,
      }
    };
  },
};

export default mockUploadService;
