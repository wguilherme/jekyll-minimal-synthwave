---
layout: post
title: Programming Languages Showcase
---

# Programming Languages Showcase

This post demonstrates code syntax highlighting across different programming languages in the minimal synthwave theme.

## Python

Here's a simple Python function for calculating fibonacci numbers:

```python
def fibonacci(n):
    """Calculate the nth fibonacci number."""
    if n <= 1:
        return n
    
    a, b = 0, 1
    for i in range(2, n + 1):
        a, b = b, a + b
    
    return b

# Example usage
result = fibonacci(10)
print(f"The 10th fibonacci number is: {result}")
```

## JavaScript

A modern JavaScript example with async/await:

```javascript
const fetchUserData = async (userId) => {
    try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        
        return {
            id: userData.id,
            name: userData.name,
            email: userData.email
        };
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('User not found');
    }
};

// Usage
fetchUserData(123).then(user => {
    console.log('User loaded:', user);
});
```

## Rust

A Rust example showing ownership and pattern matching:

```rust
use std::collections::HashMap;

#[derive(Debug)]
struct User {
    id: u32,
    name: String,
    active: bool,
}

impl User {
    fn new(id: u32, name: String) -> Self {
        User {
            id,
            name,
            active: true,
        }
    }
    
    fn deactivate(&mut self) {
        self.active = false;
    }
}

fn main() {
    let mut users: HashMap<u32, User> = HashMap::new();
    
    let user = User::new(1, "Alice".to_string());
    users.insert(user.id, user);
    
    match users.get_mut(&1) {
        Some(user) => {
            println!("Found user: {:?}", user);
            user.deactivate();
        }
        None => println!("User not found"),
    }
}
```

## Go

A Go example with goroutines and channels:

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

type Worker struct {
    id   int
    jobs chan Job
    wg   *sync.WaitGroup
}

type Job struct {
    id   int
    data string
}

func (w *Worker) start() {
    go func() {
        defer w.wg.Done()
        for job := range w.jobs {
            fmt.Printf("Worker %d processing job %d: %s\n", 
                w.id, job.id, job.data)
            time.Sleep(time.Millisecond * 100)
        }
    }()
}

func main() {
    jobs := make(chan Job, 100)
    var wg sync.WaitGroup
    
    // Start 3 workers
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        worker := &Worker{id: i, jobs: jobs, wg: &wg}
        worker.start()
    }
    
    // Send jobs
    for i := 1; i <= 5; i++ {
        jobs <- Job{id: i, data: fmt.Sprintf("task-%d", i)}
    }
    
    close(jobs)
    wg.Wait()
}
```

## HTML/CSS

Some frontend code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Synthwave Theme</title>
    <style>
        body {
            background: linear-gradient(45deg, #220C35, #001400);
            color: #b8c3f1;
            font-family: 'Courier New', monospace;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .glow {
            text-shadow: 0 0 10px #ffda00;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="glow">Welcome to the Synthwave</h1>
    </div>
</body>
</html>
```

## SQL

Database queries example:

```sql
-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (username, email) VALUES 
    ('alice', 'alice@example.com'),
    ('bob', 'bob@example.com'),
    ('charlie', 'charlie@example.com');

-- Complex query with JOIN
SELECT 
    u.username,
    u.email,
    COUNT(p.id) as post_count,
    MAX(p.created_at) as last_post
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.username, u.email
HAVING COUNT(p.id) > 0
ORDER BY post_count DESC;
```

## Terminal Commands

Some bash commands:

```bash
#!/bin/bash

# System info script
echo "=== System Information ==="
echo "Hostname: $(hostname)"
echo "OS: $(uname -s)"
echo "Kernel: $(uname -r)"
echo "Uptime: $(uptime -p)"

# Find large files
find /var/log -type f -size +10M -exec ls -lh {} \; | head -10

# Docker operations
docker build -t myapp:latest .
docker run -d -p 8080:8080 --name myapp-container myapp:latest

# Git workflow
git add .
git commit -m "feat: add new feature"
git push origin main
```

## Conclusion

This showcase demonstrates how different programming languages look with the minimal synthwave theme's syntax highlighting. The monospace font and carefully chosen colors provide excellent readability while maintaining the retro aesthetic.

Each language maintains its distinct syntax patterns while fitting harmoniously within the overall theme design.