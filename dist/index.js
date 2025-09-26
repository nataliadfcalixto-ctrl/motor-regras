"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
// ...existing code...
// ...existing code...
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
// Endpoint para calcular a próxima data
app.post('/calculate-next-due', (req, res) => {
    const { event_type, name, application_date } = req.body;
    if (!application_date) {
        return res.status(400).json({ error: 'application_date é obrigatória' });
    }
    const startDate = new Date(application_date);
    let nextDate = new Date(startDate);
    // Lógica de regras SIMPLES para o MVP
    if (event_type === 'Vacina' && name.includes('V10')) {
        nextDate.setFullYear(startDate.getFullYear() + 1); // Reforço anual
    }
    else if (event_type === 'Vermífugo') {
        nextDate.setMonth(startDate.getMonth() + 3); // A cada 3 meses
    }
    else if (event_type === 'Antipulgas') {
        nextDate.setMonth(startDate.getMonth() + 1); // Mensal
    }
    else {
        return res.json({ next_due_date: null }); // Nenhuma regra encontrada
    }
    res.json({ next_due_date: nextDate.toISOString().split('T')[0] });
});
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
// Rota principal para verificar se o servidor está no ar
app.get('/', (req, res) => {
    res.status(200).send('Motor de Regras está no ar! Pronto para receber chamadas do n8n.');
});
