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

## Table: `sessions`
```
CREATE TABLE sessions (
  id TEXT PRIMARY KEY NOT NULL UNIQUE, 
  cart TEXT[], 
)
```