const ChatMessage = require('../models/ChatMessage');

// Dairy farming context for the AI
const DAIRY_CONTEXT = `You are a knowledgeable dairy farming assistant with expertise in:
- Dairy cow management and health
- Milk production and quality
- Feed management and nutrition
- Breeding and reproduction
- Farm operations and equipment
- Agricultural best practices
- Animal welfare and care
- Dairy industry regulations
- Sustainable farming practices

Only answer questions related to dairy farming, agriculture, livestock, and related topics.
If a question is not related to these topics, politely explain that you can only assist with dairy farming related queries.
Always provide practical, actionable advice based on current best practices in dairy farming.`;

// Dairy farming knowledge base
const dairyKnowledgeBase = {
  milk_production: {
    general: [
      "To improve milk production, focus on: 1) Consistent milking schedules, 2) Proper nutrition, 3) Good udder health, and 4) Comfortable environment.",
      "The average dairy cow produces 6-7 gallons of milk per day. Production can be optimized through proper feeding and management.",
      "Key factors affecting milk production include: genetics, feed quality, milking frequency, and environmental conditions."
    ],
    quality: [
      "Milk quality is measured by: 1) Somatic cell count, 2) Bacterial count, 3) Fat content, and 4) Protein content.",
      "To maintain milk quality: 1) Clean equipment thoroughly, 2) Cool milk quickly, 3) Maintain proper storage temperature, and 4) Practice good hygiene.",
      "The ideal bulk tank temperature for milk storage is 38°F (3.3°C) to prevent bacterial growth."
    ],
    equipment: [
      "Clean milking equipment after each use with appropriate sanitizers and follow proper cleaning protocols.",
      "Regular maintenance of milking equipment includes checking vacuum levels, pulsators, and rubber parts.",
      "Replace milk liners every 2,500 milkings or every 6 months, whichever comes first."
    ]
  },
  feed_management: {
    nutrition: [
      "A balanced dairy cow diet should include: 1) Quality forage, 2) Protein supplements, 3) Energy sources, 4) Minerals, and 5) Clean water.",
      "Feed requirements vary by lactation stage: early lactation needs more energy, while late lactation needs more fiber.",
      "Proper feed storage and management can reduce waste by 10-20% and maintain nutrient quality."
    ],
    feeding: [
      "Feed dairy cows 4-6 times daily for optimal rumen function and milk production.",
      "Monitor feed intake daily - a typical dairy cow consumes 100-120 pounds of feed (wet basis) per day.",
      "Ensure constant access to clean, fresh water - cows drink 30-50 gallons of water daily."
    ],
    storage: [
      "Store silage properly to prevent spoilage and maintain nutritional value.",
      "Monitor feed inventory regularly and maintain proper rotation of feed stocks.",
      "Keep feed storage areas clean, dry, and protected from pests."
    ]
  },
  health_management: {
    prevention: [
      "Implement a comprehensive vaccination program in consultation with your veterinarian.",
      "Regular hoof trimming (every 4-6 months) helps prevent lameness.",
      "Monitor body condition scores regularly to maintain optimal health."
    ],
    diseases: [
      "Common health issues include: mastitis, milk fever, ketosis, and lameness.",
      "Early detection and treatment of mastitis is crucial for maintaining milk quality.",
      "Implement proper sanitation and biosecurity measures to prevent disease spread."
    ],
    treatment: [
      "Keep detailed health records for each animal including vaccinations and treatments.",
      "Work closely with your veterinarian for regular health checks and treatment plans.",
      "Maintain a well-stocked first aid kit and medicine storage."
    ]
  },
  breeding: {
    reproduction: [
      "Optimal breeding age for heifers is 13-15 months with adequate body weight.",
      "Watch for signs of heat: mounting behavior, restlessness, and clear mucus discharge.",
      "The average gestation period for dairy cows is 280 days."
    ],
    genetics: [
      "Select bulls based on genetic traits that complement your herd's weaknesses.",
      "Consider factors like milk production, component percentages, and health traits.",
      "Regular pregnancy checks help maintain efficient breeding programs."
    ],
    calving: [
      "Prepare clean, dry calving areas with proper bedding and monitoring.",
      "Monitor close-up cows frequently for signs of calving.",
      "Have calving supplies ready and veterinary contact information available."
    ]
  }
};

// Process a question and return an answer
exports.processQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: 'Question is required' });
    }

    // Generate response based on question category
    const answer = generateResponse(question);

    // Create response messages
    const messages = [
      {
        id: 0,
        text: question,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      },
      {
        id: 1,
        text: answer,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      }
    ];

    res.json({ messages });
  } catch (error) {
    console.error('Error processing question:', error);
    res.status(500).json({ 
      message: 'Error processing question', 
      error: error.message
    });
  }
};

// Get chat history (now just returns empty array since we're not storing history)
exports.getUserChatHistory = async (req, res) => {
  res.json({ messages: [] });
};

// Helper function to generate responses
function generateResponse(question) {
  const questionLower = question.toLowerCase();

  // Handle casual interactions
  if (isCasualInteraction(questionLower)) {
    return handleCasualInteraction(questionLower);
  }

  // Check if question is dairy-related
  if (!isDairyRelated(questionLower)) {
    return "I apologize, but I can only assist with questions related to dairy farming, agriculture, and livestock management. Please feel free to ask any questions about these topics!";
  }

  // Determine category and subcategory
  let response = '';
  
  if (questionLower.includes('milk') || questionLower.includes('production')) {
    const subcategory = questionLower.includes('quality') ? 'quality' : 
                       questionLower.includes('equipment') ? 'equipment' : 'general';
    response = getRandomResponse(dairyKnowledgeBase.milk_production[subcategory]);
  }
  else if (questionLower.includes('feed') || questionLower.includes('nutrition')) {
    const subcategory = questionLower.includes('storage') ? 'storage' : 
                       questionLower.includes('nutrition') ? 'nutrition' : 'feeding';
    response = getRandomResponse(dairyKnowledgeBase.feed_management[subcategory]);
  }
  else if (questionLower.includes('health') || questionLower.includes('disease')) {
    const subcategory = questionLower.includes('treatment') ? 'treatment' :
                       questionLower.includes('disease') ? 'diseases' : 'prevention';
    response = getRandomResponse(dairyKnowledgeBase.health_management[subcategory]);
  }
  else if (questionLower.includes('breed') || questionLower.includes('calv')) {
    const subcategory = questionLower.includes('genetic') ? 'genetics' :
                       questionLower.includes('calv') ? 'calving' : 'reproduction';
    response = getRandomResponse(dairyKnowledgeBase.breeding[subcategory]);
  }
  else {
    // Default to a general response from any category
    const categories = Object.values(dairyKnowledgeBase);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const subcategories = Object.values(randomCategory);
    response = getRandomResponse(subcategories[Math.floor(Math.random() * subcategories.length)]);
  }

  return response;
}

// Helper function to check if question is dairy-related
function isDairyRelated(question) {
  const dairyKeywords = [
    'cow', 'cows', 'dairy', 'milk', 'farm', 'farming', 'cattle', 'feed',
    'breed', 'breeding', 'livestock', 'agriculture', 'pasture', 'grass',
    'veterinary', 'health', 'disease', 'production', 'milking', 'calving',
    'calf', 'heifer', 'bull', 'nutrition', 'udder', 'mastitis', 'vaccine',
    'treatment', 'management', 'grazing', 'silage', 'hay', 'fodder'
  ];

  return dairyKeywords.some(keyword => question.includes(keyword));
}

// Helper function to get random response from array
function getRandomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}

// Helper function to check if the question is a casual interaction
function isCasualInteraction(question) {
  const casualKeywords = [
    'thank', 'thanks', 'hello', 'hi', 'hey', 'goodbye', 'bye', 'good morning', 'good afternoon', 'good evening'
  ];

  return casualKeywords.some(keyword => question.includes(keyword));
}

// Helper function to handle casual interactions
function handleCasualInteraction(question) {
  if (question.includes('thank')) {
    return "You're welcome! Let me know if you have more questions.";
  } else if (question.includes('hello') || question.includes('hi') || question.includes('hey')) {
    return "Hello! How can I assist you with dairy farming today?";
  } else if (question.includes('goodbye') || question.includes('bye')) {
    return "Goodbye! Have a great day on the farm!";
  } else if (question.includes('good morning')) {
    return "Good morning! How can I assist you with dairy farming today?";
  } else if (question.includes('good afternoon')) {
    return "Good afternoon! How can I assist you with dairy farming today?";
  } else if (question.includes('good evening')) {
    return "Good evening! How can I assist you with dairy farming today?";
  } else {
    return "I'm here to help with your dairy farming questions. What can I assist you with today?";
  }
}