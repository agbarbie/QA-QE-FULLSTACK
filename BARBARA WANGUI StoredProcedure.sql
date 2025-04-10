CREATE TABLE Products (
    ProductID SERIAL PRIMARY KEY,
    ProductName VARCHAR(255) NOT NULL,
    Price DECIMAL(10,2),
    Stock INT
);

DO $$ 
DECLARE
    products RECORD;
    product_list TEXT[] := ARRAY['Wildflower Honey', 'Acacia Honey', 'Organic Honey', 'Manuka Honey', 'Clover Honey', 'Lavender Honey'];
    prices DECIMAL[] := ARRAY[8.99, 12.50, 15.00, 25.99, 9.50, 14.99];
    stock_levels INT[] := ARRAY[100, 75, 50, 30, 120, 40];
BEGIN
    FOR i IN 1..array_length(product_list, 1) LOOP
        -- Call sp_CreateProduct for each product in the arrays
        PERFORM sp_CreateProduct(product_list[i], prices[i], stock_levels[i]);
    END LOOP;
END $$;


CREATE OR REPLACE FUNCTION sp_CreateProduct(
    p_ProductName VARCHAR,
    p_Price DECIMAL,
    p_Stock INT
) RETURNS VOID AS $$
BEGIN
    INSERT INTO Products (ProductName, Price, Stock)
    VALUES (p_ProductName, p_Price, p_Stock);
END;
$$ LANGUAGE plpgsql;

DO $$ 
DECLARE
    product_names TEXT[] := ARRAY['Wildflower Honey', 'Acacia Honey', 'Organic Honey', 'Manuka Honey', 'Clover Honey', 'Lavender Honey'];
    prices DECIMAL[] := ARRAY[8.99, 12.50, 15.00, 25.99, 9.50, 14.99];
    stock_levels INT[] := ARRAY[100, 75, 50, 30, 120, 40];
    i INT;
BEGIN
    -- Loop through each product
    FOR i IN 1..array_length(product_names, 1) LOOP
        -- Call sp_CreateProduct for each product and insert them
        PERFORM sp_CreateProduct(product_names[i], prices[i], stock_levels[i]);
    END LOOP;
END $$;


CREATE OR REPLACE FUNCTION sp_GetProductByID(
    p_ProductID INT
) RETURNS TABLE(ProductID INT, ProductName VARCHAR, Price DECIMAL, Stock INT) AS $$
BEGIN
    RETURN QUERY 
    SELECT p.ProductID, p.ProductName, p.Price, p.Stock
    FROM Products p
    WHERE p.ProductID = p_ProductID;
END;
$$ LANGUAGE plpgsql;


DO $$ 
DECLARE
    product_ids INT[] := ARRAY[1, 2, 3, 4, 5, 6];  -- Array of Product IDs to look up
    product RECORD;
BEGIN
    -- Loop through each Product ID in the array
    FOR i IN 1..array_length(product_ids, 1) LOOP
        -- Call sp_GetProductByID for each Product ID and fetch the result
        FOR product IN 
            SELECT * FROM sp_GetProductByID(product_ids[i])
        LOOP
            -- Optionally, you can process the result here (like displaying or logging)
            RAISE NOTICE 'ProductID: %, ProductName: %, Price: %, Stock: %', 
                product.ProductID, product.ProductName, product.Price, product.Stock;
        END LOOP;
    END LOOP;
END $$;


CREATE OR REPLACE FUNCTION sp_UpdateProduct(
    p_ProductID INT,
    p_ProductName VARCHAR,
    p_Price DECIMAL,
    p_Stock INT
) RETURNS VOID AS $$
BEGIN
    UPDATE Products
    SET ProductName = p_ProductName, Price = p_Price, Stock = p_Stock
    WHERE ProductID = p_ProductID;
END;
$$ LANGUAGE plpgsql;

DO $$ 
DECLARE
    product_ids INT[] := ARRAY[1, 2, 3, 4, 5, 6];  -- Array of Product IDs to update
    product_names TEXT[] := ARRAY['Updated Wildflower Honey', 'Updated Acacia Honey', 'Updated Organic Honey', 'Updated Manuka Honey', 'Updated Clover Honey', 'Updated Lavender Honey'];
    prices DECIMAL[] := ARRAY[9.99, 13.00, 16.00, 26.99, 10.50, 15.99];
    stock_levels INT[] := ARRAY[110, 80, 60, 35, 130, 45];
    i INT;
BEGIN
    -- Loop through each Product ID to update
    FOR i IN 1..array_length(product_ids, 1) LOOP
        -- Call sp_UpdateProduct for each product and update its details
        PERFORM sp_UpdateProduct(product_ids[i], product_names[i], prices[i], stock_levels[i]);
    END LOOP;
END $$;

CREATE OR REPLACE FUNCTION sp_DeleteProduct(
    p_ProductID INT
) RETURNS VOID AS $$
BEGIN
    DELETE FROM Products WHERE ProductID = p_ProductID;
END;
$$ LANGUAGE plpgsql;


DO $$ 
DECLARE
    product_ids INT[] := ARRAY[1, 2, 3, 4, 5, 6];  -- Array of Product IDs to delete
    i INT;
BEGIN
    -- Loop through each Product ID to delete
    FOR i IN 1..array_length(product_ids, 1) LOOP
        -- Call sp_DeleteProduct for each Product ID and delete the product
        PERFORM sp_DeleteProduct(product_ids[i]);
    END LOOP;
END $$;

CREATE OR REPLACE FUNCTION sp_CreateOrUpdateProduct(
    p_ProductID INT,
    p_ProductName VARCHAR,
    p_Price DECIMAL,
    p_Stock INT
) RETURNS VOID AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Products WHERE ProductID = p_ProductID) THEN
        UPDATE Products
        SET ProductName = p_ProductName, Price = p_Price, Stock = p_Stock
        WHERE ProductID = p_ProductID;
    ELSE
        INSERT INTO Products (ProductName, Price, Stock)
        VALUES (p_ProductName, p_Price, p_Stock);
    END IF;
END;
$$ LANGUAGE plpgsql;

DO $$ 
DECLARE
    product_ids INT[] := ARRAY[1, 2, 3, 4, 5, 6];  -- Array of Product IDs to create or update
    product_names TEXT[] := ARRAY['Updated Wildflower Honey', 'Updated Acacia Honey', 'Updated Organic Honey', 'Updated Manuka Honey', 'Updated Clover Honey', 'Updated Lavender Honey'];
    prices DECIMAL[] := ARRAY[9.99, 13.00, 16.00, 26.99, 10.50, 15.99];
    stock_levels INT[] := ARRAY[110, 80, 60, 35, 130, 45];
    i INT;
BEGIN
    -- Loop through each Product ID to create or update
    FOR i IN 1..array_length(product_ids, 1) LOOP
        -- Call sp_CreateOrUpdateProduct for each product and create or update it
        PERFORM sp_CreateOrUpdateProduct(product_ids[i], product_names[i], prices[i], stock_levels[i]);
    END LOOP;
END $$;








