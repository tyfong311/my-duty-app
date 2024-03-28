import { Request, Response } from 'express';
import { dbClient } from '../db/dbClient';
import { QueryResult } from 'pg';


export function validateId(idStr: string): boolean{
    try {
        const idInt = parseInt(idStr);
        if (isNaN(idInt) || idInt <= 0) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}

export function validateName(name: string): boolean {
	 // Check if the name is empty
    if (!name ||  name.trim() === '') {
        return false;
    }

    const pattern = /^[a-zA-Z0-9\s]+$/;
    return pattern.test(name);
}

export const getDuties = (req: Request, res: Response) => {
  dbClient.query('SELECT * FROM duty ORDER BY id', (err: Error, dbRes: QueryResult) => {
	  if (err) {
		console.error('Error executing query', err.stack);
	  } else {
		res.json(dbRes.rows);
	  }
  });
  
};

export const getDutyById = (req: Request, res: Response) => {
	const id = req.params.id; 
	
	// Add validation here to avoid SQL Injection
	// http://localhost:3000/api/duty/1%20OR%201=1

	const isValid = validateId(id);
	if (!isValid) {
		return res.status(400).json({ error: 'ID must be positive number' });
	}
	
	dbClient.query('SELECT * FROM duty where id='+id, (err: Error, dbRes: QueryResult) => {
	  if (err) {
		console.error('Error executing query', err.stack);
	  } else {
		res.json(dbRes.rows[0]);
	  }
	});
};

export const createDuty = (req: Request, res: Response) => {
	const { id, name } = req.body;
	
	const isIdValid = validateId(id);
	if (!isIdValid) {
		return res.status(400).json({ error: 'ID must be positive number' });
	}
	
	
	const isNameValid = validateName(name);
	if (!isNameValid) {
		return res.status(400).json({ error: 'Name must be alphanumeric or space' });
	}
	
	
	dbClient.query('INSERT INTO duty (id, name) VALUES ('+id+', \''+name+'\')', (err, dbRes: QueryResult) => {	
		if (err) {
			if (err.message.includes("duplicate")) {
			  // Handle duplicate key violation
			  res.status(400).json({ error: 'Duty with the same key already exists' });
			} else {
				console.error('Error executing query', err.stack);
				res.status(500).json({ error: 'Internal server error'});
			}
		} else {
			res.status(201).json({ message: 'Duty created successfully' });
		}
	});
	
};

export const updateDuty = (req: Request, res: Response) => {
	const id = req.params.id;

	const name = req.body.name;
	
	const isIdValid = validateId(id);
	if (!isIdValid) {
		return res.status(400).json({ error: 'ID must be positive number' });
	}
	
	const isNameValid = validateName(name);
	if (!isNameValid) {
		return res.status(400).json({ error: 'Name must be alphanumeric or space' });
	}
	
	dbClient.query('UPDATE duty SET name = \'' + name + '\' WHERE id=' + id, (err, dbRes: QueryResult) => {	
		if (err) {
			console.error('Error executing query', err.stack);
			res.status(500).json({ error: 'Internal server error'});
		} else if (dbRes.rowCount === 0) {
			res.status(400).json({ error: 'Duty not existed' });
		}
		else {
			res.status(200).json({ message: 'Duty updated successfully' });
		}
	});
	

};

export const deleteDutyById = (req: Request, res: Response) => {
	const id = req.params.id;    
	const isIdValid = validateId(id);
	if (!isIdValid) {
		return res.status(400).json({ error: 'ID must be positive number' });
	}

	dbClient.query('Delete FROM duty where id='+id, (err: Error, dbRes: QueryResult) => {
	  if (err) {
		console.error('Error executing query', err.stack);
	  } else {
		res.status(200).json({ message: 'Duty deleted successfully' });
	  }
	});
};