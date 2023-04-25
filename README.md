# DATABASE TABLES

## Table: `users`
```
CREATE TABLE users (
  id SERIAL, 
  username VARCHAR(50) UNIQUE, 
  name TEXT NOT NULL, 
  description TEXT NOT NULL
)
```