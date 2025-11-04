/**
 * Mock Second Opinion Service
 * Simulates second opinion consultation API for testing without backend
 */

// Simulate a database with localStorage
const STORAGE_KEY = 'mock_second_opinion_cases';

// Helper to get cases from storage
const getCasesFromStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Helper to save cases to storage
const saveCasesToStorage = (cases) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
};

// Initialize with some sample data if empty
const initializeSampleData = () => {
  const existing = getCasesFromStorage();
  if (existing.length === 0) {
    const sampleCases = [
      {
        id: 'case-001',
        problemDetails: 'Patient experiencing persistent headaches for 2 weeks',
        comorbidities: 'Hypertension, Type 2 Diabetes',
        previousHistory: 'Previous migraine episodes in 2023',
        status: 'Pending',
        createDate: new Date('2025-10-01').toISOString(),
        updatedDate: new Date('2025-10-01').toISOString(),
        uploads: [
          {
            id: 'upload-001',
            filename: 'blood-pressure-chart.pdf',
            fileType: 'application/pdf',
            category: 'Medical Report',
            uploadDate: new Date('2025-10-01').toISOString(),
          }
        ]
      },
      {
        id: 'case-002',
        problemDetails: 'Chronic lower back pain, difficulty in movement',
        comorbidities: 'None',
        previousHistory: 'Sports injury in 2022',
        status: 'Completed',
        createDate: new Date('2025-09-28').toISOString(),
        updatedDate: new Date('2025-10-05').toISOString(),
        uploads: [
          {
            id: 'upload-002',
            filename: 'x-ray-spine.jpg',
            fileType: 'image/jpeg',
            category: 'X-Ray',
            uploadDate: new Date('2025-09-28').toISOString(),
          },
          {
            id: 'upload-003',
            filename: 'mri-report.pdf',
            fileType: 'application/pdf',
            category: 'MRI Report',
            uploadDate: new Date('2025-09-28').toISOString(),
          }
        ]
      }
    ];
    saveCasesToStorage(sampleCases);
  }
};

// Initialize on module load
initializeSampleData();

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Convert File to base64 for storage simulation
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

const mockTellyConsultantService = {
  /**
   * Create a new consultation case
   */
  createCase: async (data, files = []) => {
    await delay(800); // Simulate network delay

    console.log('🎭 Mock: Creating telly consultant case', { data, files });

    // Process files
    const uploads = await Promise.all(
      files.map(async (file, index) => {
        const base64 = await fileToBase64(file);
        return {
          id: `upload-${Date.now()}-${index}`,
          filename: file.name,
          fileType: file.type,
          fileData: base64,
          category: file.type.includes('image') ? 'Image' : 'Document',
          uploadDate: new Date().toISOString(),
        };
      })
    );

    // Create new case
    const newCase = {
      id: `case-${Date.now()}`,
      problemDetails: data.problemDetails || '',
      comorbidities: data.comorbidities || '',
      previousHistory: data.previousHistory || '',
      status: 'Pending',
      createDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      uploads: uploads,
    };

    // Save to storage
    const cases = getCasesFromStorage();
    cases.unshift(newCase); // Add to beginning
    saveCasesToStorage(cases);

    console.log('✅ Mock: Case created successfully', newCase);

    return {
      status: 200,
      data: {
        message: 'Case created successfully',
        case: newCase,
      },
    };
  },

  /**
   * Get all consultation cases
   */
  getAllCases: async () => {
    await delay(300);

    const cases = getCasesFromStorage();
    console.log('🎭 Mock: Fetching all cases', cases);

    return {
      status: 200,
      data: cases,
    };
  },

  /**
   * Get a specific consultation case
   */
  getCaseById: async (caseId) => {
    await delay(300);

    const cases = getCasesFromStorage();
    const foundCase = cases.find(c => c.id === caseId);

    if (!foundCase) {
      throw new Error('Case not found');
    }

    console.log('🎭 Mock: Fetching case by ID', foundCase);

    return {
      status: 200,
      data: foundCase,
    };
  },

  /**
   * Update a consultation case
   */
  updateCase: async (caseId, data) => {
    await delay(500);

    const cases = getCasesFromStorage();
    const caseIndex = cases.findIndex(c => c.id === caseId);

    if (caseIndex === -1) {
      throw new Error('Case not found');
    }

    // Update case
    cases[caseIndex] = {
      ...cases[caseIndex],
      ...data,
      updatedDate: new Date().toISOString(),
    };

    saveCasesToStorage(cases);
    console.log('🎭 Mock: Case updated', cases[caseIndex]);

    return {
      status: 200,
      data: {
        message: 'Case updated successfully',
        case: cases[caseIndex],
      },
    };
  },

  /**
   * Delete a consultation case
   */
  deleteCase: async (caseId) => {
    await delay(300);

    const cases = getCasesFromStorage();
    const filteredCases = cases.filter(c => c.id !== caseId);

    if (filteredCases.length === cases.length) {
      throw new Error('Case not found');
    }

    saveCasesToStorage(filteredCases);
    console.log('🎭 Mock: Case deleted', caseId);

    return {
      status: 200,
      data: {
        message: 'Case deleted successfully',
      },
    };
  },
};

export default mockTellyConsultantService;
