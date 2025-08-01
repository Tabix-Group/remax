const { body, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Invalid input data',
      details: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  
  next();
};

// Validaciones comunes
const validateAuth = {
  register: [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
      .withMessage('Password must be at least 8 characters with uppercase, lowercase and number'),
    body('name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    body('phone')
      .optional()
      .isString()
      .isLength({ min: 6, max: 30 })
      .withMessage('Phone must be between 6 and 30 characters'),
    body('office')
      .optional()
      .isString()
      .isLength({ min: 2, max: 100 })
      .withMessage('Office must be between 2 and 100 characters'),
    body('role')
      .optional()
      .isString()
      .isLength({ min: 2, max: 20 })
      .withMessage('Role must be between 2 and 20 characters'),
    validateRequest
  ],
  login: [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
    validateRequest
  ]
};

const validateArticle = {
  create: [
    body('title')
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage('Title must be between 3 and 200 characters'),
    body('content')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Content must be at least 10 characters'),
    body('categoryId')
      .isUUID()
      .withMessage('Invalid category ID'),
    body('excerpt')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Excerpt must be less than 500 characters'),
    body('tags')
      .optional()
      .isArray()
      .withMessage('Tags must be an array'),
    validateRequest
  ],
  update: [
    body('title')
      .optional()
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage('Title must be between 3 and 200 characters'),
    body('content')
      .optional()
      .trim()
      .isLength({ min: 10 })
      .withMessage('Content must be at least 10 characters'),
    body('categoryId')
      .optional()
      .isUUID()
      .withMessage('Invalid category ID'),
    body('excerpt')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Excerpt must be less than 500 characters'),
    body('tags')
      .optional()
      .isArray()
      .withMessage('Tags must be an array'),
    validateRequest
  ]
};

const validateCategory = {
  create: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Description must be less than 500 characters'),
    body('color')
      .optional()
      .matches(/^#[0-9A-F]{6}$/i)
      .withMessage('Color must be a valid hex color'),
    body('parentId')
      .optional()
      .isUUID()
      .withMessage('Invalid parent category ID'),
    validateRequest
  ]
};

const validateComment = {
  create: [
    body('content')
      .trim()
      .isLength({ min: 1, max: 1000 })
      .withMessage('Comment must be between 1 and 1000 characters'),
    validateRequest
  ]
};

const validateChat = {
  message: [
    body('message')
      .trim()
      .isLength({ min: 1, max: 2000 })
      .withMessage('Message must be between 1 and 2000 characters'),
    body('sessionId')
      .optional()
      .isUUID()
      .withMessage('Invalid session ID'),
    validateRequest
  ]
};

const validateCalculator = {
  commission: [
    body('saleAmount')
      .isFloat({ min: 0.01 })
      .withMessage('Sale amount must be greater than 0'),
    body('commissionRate')
      .isFloat({ min: 0.01, max: 100 })
      .withMessage('Commission rate must be between 0.01 and 100'),
    body('zone')
      .optional()
      .isString()
      .isIn(['caba', 'gba', 'interior'])
      .withMessage('Zone must be caba, gba, or interior'),
    body('isIndependent')
      .optional()
      .isBoolean()
      .withMessage('isIndependent must be a boolean'),
    body('province')
      .optional()
      .isString()
      .withMessage('Province must be a string'),
    body('stampRate')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Stamp rate must be a positive number'),
    body('ivaRate')
      .optional()
      .isFloat({ min: 0, max: 100 })
      .withMessage('IVA rate must be between 0 and 100'),
    body('incomeTaxRate')
      .optional()
      .isFloat({ min: 0, max: 100 })
      .withMessage('Income tax rate must be between 0 and 100'),
    body('iibbRate')
      .optional()
      .isFloat({ min: 0, max: 100 })
      .withMessage('IIBB rate must be between 0 and 100'),
    body('otherRate')
      .optional()
      .isFloat({ min: 0, max: 100 })
      .withMessage('Other rate must be between 0 and 100'),
    validateRequest
  ],
  taxes: [
    body('amount')
      .isFloat({ min: 0.01 })
      .withMessage('Amount must be greater than 0'),
    body('taxType')
      .isIn(['STAMPS', 'ITI', 'REGISTRATION'])
      .withMessage('Invalid tax type'),
    body('province')
      .optional()
      .isString()
      .withMessage('Province must be a string'),
    body('stampRate')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Stamp rate must be a positive number'),
    validateRequest
  ]
};

module.exports = {
  validateRequest,
  validateAuth,
  validateArticle,
  validateCategory,
  validateComment,
  validateChat,
  validateCalculator
};
