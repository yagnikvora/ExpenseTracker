-- Users Table
CREATE TABLE Users (
    UserId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Mobile NVARCHAR(15) NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    ModifiedAt DATETIME NOT NULL DEFAULT GETDATE()
);

-- PaymentMethods Table
CREATE TABLE PaymentMethods (
    PaymentMethodId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    MethodName NVARCHAR(100) NOT NULL,
    Details NVARCHAR(255),
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    ModifiedAt DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

-- Categories Table
CREATE TABLE Categories (
    CategoryId INT PRIMARY KEY IDENTITY(1,1),
    CategoryName NVARCHAR(100) NOT NULL,
    CategoryType NVARCHAR(20) NOT NULL,
    CategoryDescription NVARCHAR(255),
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    ModifiedAt DATETIME NOT NULL DEFAULT GETDATE()
);

-- Transactions Table
CREATE TABLE Transactions (
    TransactionId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    CategoryId INT NOT NULL,
    PaymentMethodId INT,
    TransactionAmount DECIMAL(10, 2) NOT NULL,
    TransactionDate DATE NOT NULL,
    TransactionNotes NVARCHAR(MAX),
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    ModifiedAt DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId),
    FOREIGN KEY (PaymentMethodId) REFERENCES PaymentMethods(PaymentMethodId)
);

-- Budgets Table
CREATE TABLE Budgets (
    BudgetId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    CategoryId INT NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    ModifiedAt DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId)
);

INSERT INTO Users (Name, Email, Mobile, PasswordHash, CreatedAt, ModifiedAt)
VALUES 
('John Doe', 'john.doe@example.com', '1234567890', 'hashedpassword1', GETDATE(), GETDATE()),
('Jane Smith', 'jane.smith@example.com', '9876543210', 'hashedpassword2', GETDATE(), GETDATE()),
('Michael Johnson', 'michael.johnson@example.com', '5551234567', 'hashedpassword3', GETDATE(), GETDATE()),
('Emily Davis', 'emily.davis@example.com', '5559876543', 'hashedpassword4', GETDATE(), GETDATE()),
('David Brown', 'david.brown@example.com', '5552345678', 'hashedpassword5', GETDATE(), GETDATE());

INSERT INTO PaymentMethods (UserId, MethodName, Details, CreatedAt, ModifiedAt)
VALUES
(1, 'Credit Card', 'Visa ending in 1234', GETDATE(), GETDATE()),
(2, 'Debit Card', 'MasterCard ending in 5678', GETDATE(), GETDATE()),
(3, 'PayPal', 'PayPal email: mike.johnson@example.com', GETDATE(), GETDATE()),
(4, 'Bank Transfer', 'Bank account: 1234567890', GETDATE(), GETDATE()),
(5, 'Cash', 'Paid with cash', GETDATE(), GETDATE());

INSERT INTO Categories (CategoryName, CategoryType, CategoryDescription, CreatedAt, ModifiedAt)
VALUES
('Utilities', 'Expense', 'Bills for electricity, water, gas, etc.', GETDATE(), GETDATE()),
('Transportation', 'Expense', 'Expenses for commuting, fuel, etc.', GETDATE(), GETDATE()),
('Healthcare', 'Expense', 'Medical expenses including insurance', GETDATE(), GETDATE()),
('Investments', 'Income', 'Income from stocks, bonds, and other investments', GETDATE(), GETDATE()),
('Gifts', 'Expense', 'Gifts for birthdays, holidays, etc.', GETDATE(), GETDATE()),
('Travel', 'Expense', 'Expenses for trips, flights, and accommodations', GETDATE(), GETDATE()),
('Bonus', 'Income', 'Year-end or performance-based bonus', GETDATE(), GETDATE()),
('Education', 'Expense', 'Tuition fees, courses, and educational expenses', GETDATE(), GETDATE()),
('Food Delivery', 'Expense', 'Expenses for food ordered online', GETDATE(), GETDATE()),
('Insurance', 'Expense', 'Premiums for health, car, life insurance, etc.', GETDATE(), GETDATE()),
('Interest', 'Income', 'Interest earned on savings or investments', GETDATE(), GETDATE()),
('Taxes', 'Expense', 'Income tax, property tax, etc.', GETDATE(), GETDATE()),
('Loan Repayment', 'Expense', 'Payments toward personal or student loans', GETDATE(), GETDATE()),
('Savings', 'Income', 'Income set aside for future use', GETDATE(), GETDATE()),
('Pet Care', 'Expense', 'Expenses for pet food, vet bills, etc.', GETDATE(), GETDATE()),
('Subscriptions', 'Expense', 'Monthly or annual subscription services', GETDATE(), GETDATE()),
('Legal Fees', 'Expense', 'Costs associated with legal services', GETDATE(), GETDATE()),
('Charity', 'Expense', 'Donations to charity or nonprofits', GETDATE(), GETDATE()),
('Business Income', 'Income', 'Income generated from business activities', GETDATE(), GETDATE()),
('Mortgage', 'Expense', 'Payments for home mortgage or home loan', GETDATE(), GETDATE()),
('Childcare', 'Expense', 'Expenses for daycare or babysitting services', GETDATE(), GETDATE()),
('Entertainment Subscriptions', 'Expense', 'Expenses for Netflix, Spotify, etc.', GETDATE(), GETDATE()),
('Social Events', 'Expense', 'Costs for parties, gatherings, and social events', GETDATE(), GETDATE()),
('Clothing', 'Expense', 'Spending on clothes and accessories', GETDATE(), GETDATE()),
('Fitness', 'Expense', 'Expenses for gym memberships and fitness programs', GETDATE(), GETDATE()),
('Groceries', 'Expense', 'Daily household shopping expenses', GETDATE(), GETDATE()),
('Salary', 'Income', 'Monthly salary payment', GETDATE(), GETDATE()),
('Entertainment', 'Expense', 'Spending on movies, games, etc.', GETDATE(), GETDATE()),
('Rent', 'Expense', 'Monthly rent payment', GETDATE(), GETDATE()),
('Freelance', 'Income', 'Freelance project income', GETDATE(), GETDATE());

INSERT INTO Transactions (UserId, CategoryId, PaymentMethodId, TransactionAmount, TransactionDate, TransactionNotes, CreatedAt, ModifiedAt)
VALUES
(1, 1, 1, 50.00, '2024-12-10', 'Grocery shopping at SuperMart', GETDATE(), GETDATE()),
(2, 2, 2, 1500.00, '2024-12-01', 'Salary for November', GETDATE(), GETDATE()),
(3, 3, 3, 60.00, '2024-12-15', 'Movie tickets for family', GETDATE(), GETDATE()),
(4, 4, 4, 800.00, '2024-12-05', 'Monthly rent for apartment', GETDATE(), GETDATE()),
(5, 5, 5, 200.00, '2024-12-12', 'Payment for freelance web development project', GETDATE(), GETDATE());

INSERT INTO Budgets (UserId, CategoryId, Amount, StartDate, EndDate, CreatedAt, ModifiedAt)
VALUES
(1, 1, 300.00, '2024-12-01', '2024-12-31', GETDATE(), GETDATE()),
(2, 2, 2500.00, '2024-12-01', '2024-12-31', GETDATE(), GETDATE()),
(3, 3, 100.00, '2024-12-01', '2024-12-31', GETDATE(), GETDATE()),
(4, 4, 800.00, '2024-12-01', '2024-12-31', GETDATE(), GETDATE()),
(5, 5, 500.00, '2024-12-01', '2024-12-31', GETDATE(), GETDATE());


-- Select All Users with Joins
GO
CREATE OR ALTER PROCEDURE PR_Users_SelectAll
AS
BEGIN
    SELECT [dbo].[Users].[UserId], 
           [dbo].[Users].[Name], 
           [dbo].[Users].[Email], 
           [dbo].[Users].[Mobile], 
           [dbo].[Users].[PasswordHash], 
           [dbo].[Users].[CreatedAt], 
           [dbo].[Users].[ModifiedAt]
    FROM [dbo].[Users];
END;

-- Select User By ID with Joins
GO
CREATE OR ALTER PROCEDURE PR_Users_SelectByID (@UserId INT)
AS
BEGIN
    SELECT [dbo].[Users].[UserId], 
           [dbo].[Users].[Name], 
           [dbo].[Users].[Email], 
           [dbo].[Users].[Mobile], 
           [dbo].[Users].[PasswordHash], 
           [dbo].[Users].[CreatedAt], 
           [dbo].[Users].[ModifiedAt]
    FROM [dbo].[Users]
    WHERE [dbo].[Users].[UserId] = @UserId;
END;

-- Insert User
GO
CREATE OR ALTER PROCEDURE PR_Users_Insert 
    @Name NVARCHAR(100), 
    @Email NVARCHAR(100), 
    @Mobile NVARCHAR(15), 
    @PasswordHash NVARCHAR(255)
AS
BEGIN
    INSERT INTO [dbo].[Users] ([Name], [Email], [Mobile], [PasswordHash], [CreatedAt], [ModifiedAt])
    VALUES (@Name, @Email, @Mobile, @PasswordHash, GETDATE(), GETDATE());
END;

-- Update User By ID
GO
CREATE OR ALTER PROCEDURE PR_Users_UpdateByID 
    @UserId INT, 
    @Name NVARCHAR(100), 
    @Email NVARCHAR(100), 
    @Mobile NVARCHAR(15), 
    @PasswordHash NVARCHAR(255)
AS
BEGIN
    UPDATE [dbo].[Users]
    SET [Name] = @Name, 
        [Email] = @Email, 
        [Mobile] = @Mobile, 
        [PasswordHash] = @PasswordHash, 
        [ModifiedAt] = GETDATE()
    WHERE [dbo].[Users].[UserId] = @UserId;
END;

-- Delete User By ID
GO
CREATE OR ALTER PROCEDURE PR_Users_DeleteByID (@UserId INT)
AS
BEGIN
    DELETE FROM [dbo].[Users]
    WHERE [dbo].[Users].[UserId] = @UserId;
END;


-- Select All Payment Methods with Joins
GO
CREATE OR ALTER PROCEDURE PR_PaymentMethods_SelectAll
AS
BEGIN
    SELECT [dbo].[PaymentMethods].[PaymentMethodId], 
           [dbo].[Users].[Name] AS UserName,
           [dbo].[PaymentMethods].[MethodName], 
           [dbo].[PaymentMethods].[Details],
		   [dbo].[PaymentMethods].[UserId],
           [dbo].[PaymentMethods].[CreatedAt], 
           [dbo].[PaymentMethods].[ModifiedAt]
    FROM [dbo].[PaymentMethods]
    JOIN [dbo].[Users] ON [dbo].[PaymentMethods].[UserId] = [dbo].[Users].[UserId];
END;

-- Select Payment Method By ID with Joins
GO
CREATE OR ALTER PROCEDURE PR_PaymentMethods_SelectByID (@PaymentMethodId INT)
AS
BEGIN
    SELECT [dbo].[PaymentMethods].[PaymentMethodId], 
           [dbo].[Users].[Name] AS UserName, 
           [dbo].[PaymentMethods].[MethodName], 
           [dbo].[PaymentMethods].[Details], 
		   [dbo].[PaymentMethods].[UserId],
           [dbo].[PaymentMethods].[CreatedAt], 
           [dbo].[PaymentMethods].[ModifiedAt]
    FROM [dbo].[PaymentMethods]
    JOIN [dbo].[Users] ON [dbo].[PaymentMethods].[UserId] = [dbo].[Users].[UserId]
    WHERE [dbo].[PaymentMethods].[PaymentMethodId] = @PaymentMethodId;
END;

-- Insert Payment Method
GO
CREATE OR ALTER PROCEDURE PR_PaymentMethods_Insert 
    @UserId INT, 
    @MethodName NVARCHAR(100), 
    @Details NVARCHAR(255)
AS
BEGIN
    INSERT INTO [dbo].[PaymentMethods] ([UserId], [MethodName], [Details], [CreatedAt], [ModifiedAt])
    VALUES (@UserId, @MethodName, @Details, GETDATE(), GETDATE());
END;

-- Update Payment Method By ID
GO
CREATE OR ALTER PROCEDURE PR_PaymentMethods_UpdateByID 
    @PaymentMethodId INT, 
    @UserId INT, 
    @MethodName NVARCHAR(100), 
    @Details NVARCHAR(255)
AS
BEGIN
    UPDATE [dbo].[PaymentMethods]
    SET [UserId] = @UserId, 
        [MethodName] = @MethodName, 
        [Details] = @Details, 
        [ModifiedAt] = GETDATE()
    WHERE [dbo].[PaymentMethods].[PaymentMethodId] = @PaymentMethodId;
END;

-- Delete Payment Method By ID
GO
CREATE OR ALTER PROCEDURE PR_PaymentMethods_DeleteByID (@PaymentMethodId INT)
AS
BEGIN
    DELETE FROM [dbo].[PaymentMethods]
    WHERE [dbo].[PaymentMethods].[PaymentMethodId] = @PaymentMethodId;
END;


-- Select All Categories with Joins
GO
CREATE OR ALTER PROCEDURE PR_Categories_SelectAll
AS
BEGIN
    SELECT [dbo].[Categories].[CategoryId], 
           [dbo].[Categories].[CategoryName], 
		   [dbo].[Users].[Name] AS UserName, 
           [dbo].[Categories].[CategoryType], 
           [dbo].[Categories].[CategoryDescription], 
           [dbo].[Categories].[CreatedAt], 
           [dbo].[Categories].[ModifiedAt],
		   [dbo].[Categories].[UserId]
    FROM [dbo].[Categories]
	JOIN [dbo].[Users] ON [dbo].[Categories].[UserId] = [dbo].[Users].[UserId]
;
END;

-- Select Category By ID with Joins
GO
CREATE OR ALTER PROCEDURE PR_Categories_SelectByID (@CategoryId INT)
AS
BEGIN
     SELECT [dbo].[Categories].[CategoryId], 
           [dbo].[Categories].[CategoryName], 
		   [dbo].[Users].[Name] AS UserName, 
           [dbo].[Categories].[CategoryType], 
           [dbo].[Categories].[CategoryDescription], 
           [dbo].[Categories].[CreatedAt], 
           [dbo].[Categories].[ModifiedAt],
		   [dbo].[Categories].[UserId]
    FROM [dbo].[Categories]
	JOIN [dbo].[Users] ON [dbo].[Categories].[UserId] = [dbo].[Users].[UserId]
    WHERE [dbo].[Categories].[CategoryId] = @CategoryId;
END;

-- Insert Category
GO
CREATE OR ALTER PROCEDURE PR_Categories_Insert 
    @CategoryName NVARCHAR(100),
	@UserId INT, 
    @CategoryType NVARCHAR(20), 
    @CategoryDescription NVARCHAR(255)
AS
BEGIN
    INSERT INTO [dbo].[Categories] ([CategoryName], [CategoryType], [CategoryDescription],[UserID], [CreatedAt], [ModifiedAt])
    VALUES (@CategoryName, @CategoryType, @CategoryDescription,@UserId, GETDATE(), GETDATE());
END;

-- Update Category By ID
GO
CREATE OR ALTER PROCEDURE PR_Categories_UpdateByID 
    @CategoryId INT,
    @UserId INT, 
    @CategoryName NVARCHAR(100), 
    @CategoryType NVARCHAR(20), 
    @CategoryDescription NVARCHAR(255)
AS
BEGIN
    UPDATE [dbo].[Categories]
    SET [CategoryName] = @CategoryName, 
        [CategoryType] = @CategoryType, 
        [CategoryDescription] = @CategoryDescription, 
		[UserId] = @UserId,
        [ModifiedAt] = GETDATE()
    WHERE [dbo].[Categories].[CategoryId] = @CategoryId;
END;

-- Delete Category By ID
GO
CREATE OR ALTER PROCEDURE PR_Categories_DeleteByID (@CategoryId INT)
AS
BEGIN
    DELETE FROM [dbo].[Categories]
    WHERE [dbo].[Categories].[CategoryId] = @CategoryId;
END;


-- Select All Transactions with Joins
GO
CREATE OR ALTER PROCEDURE PR_Transactions_SelectAll
AS
BEGIN
    SELECT [dbo].[Transactions].[TransactionId], 
           [dbo].[Users].[Name] AS UserName, 
           [dbo].[Categories].[CategoryName], 
		   [dbo].[Transactions].[CategoryId], 
           [dbo].[PaymentMethods].[MethodName], 
		   [dbo].[Transactions].[PaymentMethodId], 
           [dbo].[Transactions].[TransactionAmount], 
           [dbo].[Transactions].[TransactionDate], 
           [dbo].[Transactions].[TransactionNotes],
		   [dbo].[Transactions].[UserId], 
           [dbo].[Transactions].[CreatedAt], 
           [dbo].[Transactions].[ModifiedAt]
    FROM [dbo].[Transactions]
    JOIN [dbo].[Users] ON [dbo].[Transactions].[UserId] = [dbo].[Users].[UserId]
    JOIN [dbo].[Categories] ON [dbo].[Transactions].[CategoryId] = [dbo].[Categories].[CategoryId]
    LEFT JOIN [dbo].[PaymentMethods] ON [dbo].[Transactions].[PaymentMethodId] = [dbo].[PaymentMethods].[PaymentMethodId];
END;

-- Select Transaction By ID with Joins
GO
CREATE OR ALTER PROCEDURE PR_Transactions_SelectByID (@TransactionId INT)
AS
BEGIN
     SELECT [dbo].[Transactions].[TransactionId], 
           [dbo].[Users].[Name] AS UserName, 
           [dbo].[Categories].[CategoryName], 
		   [dbo].[Transactions].[CategoryId], 
           [dbo].[PaymentMethods].[MethodName], 
		   [dbo].[Transactions].[PaymentMethodId], 
           [dbo].[Transactions].[TransactionAmount], 
           [dbo].[Transactions].[TransactionDate], 
           [dbo].[Transactions].[TransactionNotes],
		   [dbo].[Transactions].[UserId], 
           [dbo].[Transactions].[CreatedAt], 
           [dbo].[Transactions].[ModifiedAt]
    FROM [dbo].[Transactions]
    JOIN [dbo].[Users] ON [dbo].[Transactions].[UserId] = [dbo].[Users].[UserId]
    JOIN [dbo].[Categories] ON [dbo].[Transactions].[CategoryId] = [dbo].[Categories].[CategoryId]
    LEFT JOIN [dbo].[PaymentMethods] ON [dbo].[Transactions].[PaymentMethodId] = [dbo].[PaymentMethods].[PaymentMethodId]
    WHERE [dbo].[Transactions].[TransactionId] = @TransactionId;
END;

-- Insert Transaction
GO
CREATE OR ALTER PROCEDURE PR_Transactions_Insert 
    @UserId INT, 
    @CategoryId INT, 
    @PaymentMethodId INT, 
    @TransactionAmount DECIMAL(18,2), 
    @TransactionDate DATETIME, 
    @TransactionNotes NVARCHAR(255)
AS
BEGIN
    INSERT INTO [dbo].[Transactions] ([UserId], [CategoryId], [PaymentMethodId], [TransactionAmount], [TransactionDate], [TransactionNotes], [CreatedAt], [ModifiedAt])
    VALUES (@UserId, @CategoryId, @PaymentMethodId, @TransactionAmount, @TransactionDate, @TransactionNotes, GETDATE(), GETDATE());
END;

-- Update Transaction By ID
GO
CREATE OR ALTER PROCEDURE PR_Transactions_UpdateByID 
    @TransactionId INT, 
    @UserId INT, 
    @CategoryId INT, 
    @PaymentMethodId INT, 
    @TransactionAmount DECIMAL(18,2), 
    @TransactionDate DATETIME, 
    @TransactionNotes NVARCHAR(255)
AS
BEGIN
    UPDATE [dbo].[Transactions]
    SET [UserId] = @UserId, 
        [CategoryId] = @CategoryId, 
        [PaymentMethodId] = @PaymentMethodId, 
        [TransactionAmount] = @TransactionAmount, 
        [TransactionDate] = @TransactionDate, 
        [TransactionNotes] = @TransactionNotes, 
        [ModifiedAt] = GETDATE()
    WHERE [dbo].[Transactions].[TransactionId] = @TransactionId;
END;

-- Delete Transaction By ID
GO
CREATE OR ALTER PROCEDURE PR_Transactions_DeleteByID (@TransactionId INT)
AS
BEGIN
    DELETE FROM [dbo].[Transactions]
    WHERE [dbo].[Transactions].[TransactionId] = @TransactionId;
END;


-- Select All Budgets with Joins
GO
CREATE OR ALTER PROCEDURE PR_Budgets_SelectAll
AS
BEGIN
    SELECT [dbo].[Budgets].[BudgetId], 
           [dbo].[Users].[Name] AS UserName, 
           [dbo].[Categories].[CategoryName], 
		   [dbo].[Budgets].[CategoryId], 
           [dbo].[Budgets].[Amount], 
           [dbo].[Budgets].[StartDate], 
           [dbo].[Budgets].[EndDate], 
		   [dbo].[Budgets].[UserId], 
           [dbo].[Budgets].[CreatedAt], 
           [dbo].[Budgets].[ModifiedAt]
    FROM [dbo].[Budgets]
    JOIN [dbo].[Users] ON [dbo].[Budgets].[UserId] = [dbo].[Users].[UserId]
    JOIN [dbo].[Categories] ON [dbo].[Budgets].[CategoryId] = [dbo].[Categories].[CategoryId];
END;

-- Select Budget By ID with Joins
GO
CREATE OR ALTER PROCEDURE PR_Budgets_SelectByID (@BudgetId INT)
AS
BEGIN
   SELECT [dbo].[Budgets].[BudgetId], 
           [dbo].[Users].[Name] AS UserName, 
           [dbo].[Categories].[CategoryName], 
		   [dbo].[Budgets].[CategoryId], 
           [dbo].[Budgets].[Amount], 
           [dbo].[Budgets].[StartDate], 
           [dbo].[Budgets].[EndDate], 
		   [dbo].[Budgets].[UserId], 
           [dbo].[Budgets].[CreatedAt], 
           [dbo].[Budgets].[ModifiedAt]
    FROM [dbo].[Budgets]
    JOIN [dbo].[Users] ON [dbo].[Budgets].[UserId] = [dbo].[Users].[UserId]
    JOIN [dbo].[Categories] ON [dbo].[Budgets].[CategoryId] = [dbo].[Categories].[CategoryId]
    WHERE [dbo].[Budgets].[BudgetId] = @BudgetId;
END;

-- Insert Budget
GO
CREATE OR ALTER PROCEDURE PR_Budgets_Insert 
    @UserId INT, 
    @CategoryId INT, 
    @Amount DECIMAL(10, 2), 
    @StartDate DATE, 
    @EndDate DATE
AS
BEGIN
    INSERT INTO [dbo].[Budgets] ([UserId], [CategoryId], [Amount], [StartDate], [EndDate], [CreatedAt], [ModifiedAt])
    VALUES (@UserId, @CategoryId, @Amount, @StartDate, @EndDate, GETDATE(), GETDATE());
END;

-- Update Budget By ID
GO
CREATE OR ALTER PROCEDURE PR_Budgets_UpdateByID 
    @BudgetId INT, 
    @UserId INT, 
    @CategoryId INT, 
    @Amount DECIMAL(10, 2), 
    @StartDate DATE, 
    @EndDate DATE
AS
BEGIN
    UPDATE [dbo].[Budgets]
    SET [UserId] = @UserId, 
        [CategoryId] = @CategoryId, 
        [Amount] = @Amount, 
        [StartDate] = @StartDate, 
        [EndDate] = @EndDate, 
        [ModifiedAt] = GETDATE()
    WHERE [dbo].[Budgets].[BudgetId] = @BudgetId;
END;

-- Delete Budget By ID
GO
CREATE OR ALTER PROCEDURE PR_Budgets_DeleteByID (@BudgetId INT)
AS
BEGIN

    DELETE FROM [dbo].[Budgets]
    WHERE [dbo].[Budgets].[BudgetId] = @BudgetId;
END;
