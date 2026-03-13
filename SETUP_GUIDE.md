# Database Setup Guide (Urdu/English)

## Method 1: Automatic Setup (Aasaan Tarika) ✅

### Windows Users:

1. **Backend folder mein jao:**
   ```bash
   cd C:\Users\dell\Desktop\lawa-food-delivery\backend
   ```

2. **Setup file run karo:**
   ```bash
   SETUP_DB.bat
   ```
   
   Password puchega - apna PostgreSQL password dalo

3. **Done!** Database aur tables ban jayenge

---

## Method 2: Manual Setup (Step by Step)

### Step 1: PostgreSQL Kholo

```bash
# Command Prompt mein ye type karo
psql -U postgres
```

Password enter karo jo PostgreSQL install karte waqt set kiya tha.

### Step 2: Database Banao

PostgreSQL shell mein ye commands chalao:

```sql
-- Database banao
CREATE DATABASE lawa_delivery;

-- Check karo ban gaya
\l

-- Database mein jao
\c lawa_delivery

-- Exit karo
\q
```

### Step 3: Tables Banao

Command Prompt mein (backend folder se):

```bash
psql -U postgres -d lawa_delivery -f models\schema.sql
```

### Step 4: Verify Karo

```bash
# Database mein dobara jao
psql -U postgres -d lawa_delivery

# Tables dekho
\dt

# Exit karo
\q
```

---

## Method 3: pgAdmin Use Karo (GUI)

### Step 1: pgAdmin Open Karo

1. Windows search mein "pgAdmin" type karo
2. Open karo
3. Password dalo

### Step 2: Database Banao

1. Left sidebar mein **PostgreSQL 15** (ya jo version hai) expand karo
2. **Databases** par right-click
3. **Create** → **Database** select karo
4. Database name: `lawa_delivery`
5. **Save** click karo

### Step 3: Tables Banao

1. `lawa_delivery` database par right-click
2. **Query Tool** select karo
3. File open karo: `backend\models\schema.sql`
4. Ya file ka content copy karke paste karo
5. **Execute** button (▶️) click karo ya F5 press karo

### Step 4: Verify

Left sidebar mein:
- `lawa_delivery` → **Schemas** → **public** → **Tables** expand karo
- Ye tables dikhne chahiye:
  - users
  - products
  - orders
  - order_items
  - cart

---

## Verification Commands

Tables successfully bane ya nahi check karne ke liye:

```bash
psql -U postgres -d lawa_delivery
```

Phir ye command:

```sql
-- Tables list
\dt

-- Ya detailed check
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Exit
\q
```

---

## Common Issues

### Issue 1: "psql: command not found"

**Solution:**
PostgreSQL path add karo environment variables mein:
1. Search "Environment Variables"
2. System Variables → Path → Edit
3. Add karo: `C:\Program Files\PostgreSQL\15\bin` (apna version check karo)
4. OK karo aur terminal restart karo

### Issue 2: "password authentication failed"

**Solution:**
PostgreSQL password galat hai. Password reset karo:
1. PostgreSQL uninstall karo
2. Dobara install karo
3. Password yaad rakhna!

### Issue 3: "database already exists"

**Solution:**
Koi problem nahi! Seedha tables banao:
```bash
psql -U postgres -d lawa_delivery -f models\schema.sql
```

---

## After Setup

Database ready hone ke baad:

1. **Backend start karo:**
   ```bash
   npm run dev
   ```

2. **Test karo:**
   - Browser mein: http://localhost:5000
   - Ye message dikhna chahiye: "Lawa Delivery API is running!"

3. **Frontend test karo:**
   - Register karo: http://localhost:8080
   - Login karo
   - Products dekho

---

## Need Help?

Agar koi problem ho to:
1. Backend terminal check karo - koi error?
2. PostgreSQL running hai? (Services mein check karo)
3. Database name sahi hai? `lawa_delivery`
4. Password sahi hai?

Done! 🚀
