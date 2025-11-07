// Rotas de pets
const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const authMiddleware = require('../middleware/auth');

// Rotas públicas
router.get('/', petController.getAllPets);

// Rotas protegidas - IMPORTANTE: rotas específicas devem vir ANTES de rotas com parâmetros
router.get('/user/my-pets', authMiddleware, petController.getMyPets);
router.post('/', authMiddleware, petController.createPet);
router.put('/:id', authMiddleware, petController.updatePet);
router.delete('/:id', authMiddleware, petController.deletePet);

// Rota com parâmetro por último
router.get('/:id', petController.getPetById);

module.exports = router;