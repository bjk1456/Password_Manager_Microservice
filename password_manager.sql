DROP TABLE IF EXISTS master_password cascade;
CREATE TABLE IF NOT EXISTS master_password ( master_p_id serial primary key, email text not null unique, m_password text not null);

DROP TABLE IF EXISTS regular_password cascade;
CREATE TABLE IF NOT EXISTS regular_password ( regular_p_id serial primary key, r_password text not null, 
	master_p_id serial references master_password(master_p_id));

CREATE OR REPLACE PROCEDURE store_master_password(_master_email TEXT, _master_password TEXT)
LANGUAGE plpgsql    
AS $$
BEGIN
    INSERT INTO master_password (email, m_password) 
    VALUES ( _master_email, crypt(_master_password, gen_salt('bf')) );

    COMMIT;
END;
$$;

CREATE OR REPLACE FUNCTION authenticate_email(_master_email TEXT, _master_password TEXT) RETURNS integer AS $$
    SELECT master_p_id
    FROM master_password
    WHERE email = _master_email
      AND m_password = crypt(_master_password, m_password)
$$ LANGUAGE sql;

CREATE OR REPLACE PROCEDURE store_regular_password(_master_email TEXT, _regular_password TEXT, _key TEXT)
LANGUAGE plpgsql    
AS $$
DECLARE
	m_id real := (SELECT master_p_id FROM master_password WHERE master_password.email = _master_email);
BEGIN
    INSERT INTO regular_password (r_password, master_p_id)
    VALUES (PGP_SYM_ENCRYPT(_regular_password, _key)::text, m_id );

    COMMIT;
END;
$$;


CREATE OR REPLACE FUNCTION get_regular_password(_master_email text, _regular_password text) RETURNS TABLE(
    freetext_password text)
LANGUAGE plpgsql    
AS $$
DECLARE
    m_id real := (SELECT master_p_id FROM master_password WHERE master_password.email = _master_email);
BEGIN    
   RETURN QUERY SELECT pgp_sym_decrypt(r_password::bytea,_regular_password) as freetext_password FROM regular_password WHERE master_p_id = m_id;
END $$;

