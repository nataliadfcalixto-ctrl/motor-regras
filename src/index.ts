const express = require('express');
import { Request, Response } from 'express';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Motor de Regras está no ar! (versão CommonJS)');
});

app.post('/calculate-next-due', (req: Request, res: Response) => {
    const { event_type, name, application_date } = req.body;
    if (!application_date || typeof application_date !== 'string') {
        return res.status(400).json({ error: 'application_date é obrigatória e deve ser uma string AAAA-MM-DD.' });
    }
    const startDate = new Date(application_date);
    if (isNaN(startDate.getTime())) {
        return res.status(400).json({ error: 'Formato de application_date inválido. Use AAAA-MM-DD.' });
    }
    let nextDate = new Date(startDate);
    if (event_type === 'Vacina') {
        nextDate.setFullYear(startDate.getFullYear() + 1);
    } else if (event_type === 'Vermífugo') {
        nextDate.setMonth(startDate.getMonth() + 3);
    } else {
        return res.json({ next_due_date: null });
    }
    res.json({ next_due_date: nextDate.toISOString().split('T')[0] });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));