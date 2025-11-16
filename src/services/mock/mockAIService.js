/**
 * Mock AI Service
 * Returns fake AI responses for testing without a backend
 */

const delay = (ms = 1200) => new Promise(resolve => setTimeout(resolve, ms));

// Mock AI responses based on keywords
const generateAIResponse = (question) => {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('summary') || lowerQuestion.includes('summarize')) {
    return 'This document appears to be a medical report containing patient information, diagnosis, and treatment recommendations. The main findings indicate normal vital signs with recommendations for follow-up in 3 months.';
  }
  
  if (lowerQuestion.includes('diagnosis') || lowerQuestion.includes('condition')) {
    return 'Based on the document analysis, the primary diagnosis mentioned is Type 2 Diabetes Mellitus with good glycemic control. The patient also has a history of hypertension which is currently well-managed with medication.';
  }
  
  if (lowerQuestion.includes('medication') || lowerQuestion.includes('prescription')) {
    return 'The prescribed medications include: Metformin 500mg twice daily, Lisinopril 10mg once daily, and Atorvastatin 20mg at bedtime. All medications should be taken with food.';
  }
  
  if (lowerQuestion.includes('test') || lowerQuestion.includes('lab') || lowerQuestion.includes('result')) {
    return 'The laboratory results show: HbA1c: 6.5%, Fasting Glucose: 110 mg/dL, Total Cholesterol: 180 mg/dL, LDL: 100 mg/dL, HDL: 55 mg/dL, Blood Pressure: 128/82 mmHg. All values are within acceptable ranges.';
  }
  
  if (lowerQuestion.includes('recommendation') || lowerQuestion.includes('advice')) {
    return 'The recommendations include: Continue current medications, monitor blood glucose regularly, maintain a healthy diet with reduced carbohydrates, exercise for 30 minutes daily, and schedule follow-up appointment in 3 months.';
  }
  
  // Default response
  return `Based on the document analysis, ${question} The information suggests maintaining current treatment plan with regular monitoring. Please consult with your healthcare provider for personalized medical advice. This is a mock response for testing purposes.`;
};

// Mock conversation history
let mockConversations = {
  'doc-1': [
    {
      id: 'conv-1',
      question: 'What is the main diagnosis?',
      answer: 'The main diagnosis is Type 2 Diabetes Mellitus with well-controlled blood sugar levels.',
      timestamp: new Date('2024-10-10T10:30:00').toISOString(),
    },
    {
      id: 'conv-2',
      question: 'What medications are prescribed?',
      answer: 'Metformin 500mg twice daily and Lisinopril 10mg once daily.',
      timestamp: new Date('2024-10-10T10:32:00').toISOString(),
    },
  ],
};

const mockAIService = {
  /**
   * Mock ask AI question
   */
  askQuestion: async (question, file = null) => {
    await delay();
    
    if (!question || question.trim().length === 0) {
      throw {
        response: {
          status: 400,
          data: { message: 'Question is required' }
        }
      };
    }

    const aiResponse = generateAIResponse(question);
    
    console.log('🤖 [MOCK AI] Question:', question);
    console.log('🤖 [MOCK AI] Response:', aiResponse);
    
    // Add to mock conversation history
    const documentId = file ? `doc-${Date.now()}` : 'general';
    if (!mockConversations[documentId]) {
      mockConversations[documentId] = [];
    }
    
    mockConversations[documentId].push({
      id: `conv-${Date.now()}`,
      question,
      answer: aiResponse,
      timestamp: new Date().toISOString(),
    });
    
    return {
      status: 200,
      data: {
        aiResponse,
        question,
        timestamp: new Date().toISOString(),
        confidence: 0.85,
        model: 'mock-gpt-4',
      }
    };
  },

  /**
   * Mock analyze document
   */
  analyzeDocument: async (file, options = {}) => {
    await delay(1500);
    
    if (!file) {
      throw {
        response: {
          status: 400,
          data: { message: 'File is required' }
        }
      };
    }

    console.log('🤖 [MOCK AI] Analyzing document:', file.name);
    
    return {
      status: 200,
      data: {
        analysis: {
          documentType: 'Medical Report',
          entities: [
            { type: 'PERSON', value: 'John Doe', confidence: 0.95 },
            { type: 'DATE', value: '2024-10-10', confidence: 0.98 },
            { type: 'CONDITION', value: 'Type 2 Diabetes', confidence: 0.92 },
            { type: 'MEDICATION', value: 'Metformin', confidence: 0.89 },
          ],
          summary: 'Medical report for patient John Doe dated October 10, 2024. Patient has Type 2 Diabetes managed with Metformin. Regular follow-ups recommended.',
          keyFindings: [
            'Diagnosis: Type 2 Diabetes Mellitus',
            'Current medication: Metformin 500mg',
            'Blood glucose levels: Well controlled',
            'Next appointment: 3 months',
          ],
          sentiment: 'neutral',
          language: 'en',
        },
        fileName: file.name,
        fileSize: file.size,
        processedAt: new Date().toISOString(),
      }
    };
  },

  /**
   * Mock get conversation history
   */
  getConversationHistory: async (documentId = null) => {
    await delay(400);
    
    const conversations = documentId 
      ? mockConversations[documentId] || []
      : Object.values(mockConversations).flat();
    
    console.log('🤖 [MOCK AI] Conversation history:', conversations);
    
    return {
      status: 200,
      data: {
        conversations,
        total: conversations.length,
        documentId,
      }
    };
  },

  /**
   * Mock clear conversations
   */
  clearConversations: async (documentId = null) => {
    await delay(300);
    
    if (documentId) {
      delete mockConversations[documentId];
      console.log('🤖 [MOCK AI] Cleared conversations for:', documentId);
    } else {
      mockConversations = {};
      console.log('🤖 [MOCK AI] Cleared all conversations');
    }
    
    return {
      status: 200,
      data: {
        message: 'Conversations cleared successfully (Mock Mode)',
        documentId,
      }
    };
  },
};

export default mockAIService;
