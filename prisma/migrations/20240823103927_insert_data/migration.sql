-- This is an empty migration.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


INSERT INTO "gyms" (id, title, description, phone, latitude, longitude) VALUES
(gen_random_uuid(), 'Smart Fit', 'Academia moderna com planos acessíveis e excelente infraestrutura.', '111-111-1111', 40.712776, -74.005974),
(gen_random_uuid(), 'Bodytech', 'Academia premium com serviços personalizados e ambiente exclusivo.', '222-222-2222', 34.052235, -118.243683),
(gen_random_uuid(), 'Academia Fórmula', 'Academia focada em treinos funcionais e personalizados.', '333-333-3333', 51.507351, -0.127758),
(gen_random_uuid(), 'Just Fit', 'Academia com ambiente descontraído e planos flexíveis.', '444-444-4444', 48.856613, 2.352222),
(gen_random_uuid(), 'Bluefit', 'Academia com grande variedade de aulas e equipamentos modernos.', '555-555-5555', 35.689487, 139.691711),
(gen_random_uuid(), 'Selfit', 'Academia que oferece autonomia ao aluno e treinos personalizados.', '666-666-6666', -33.868820, 151.209290),
(gen_random_uuid(), 'Runner', 'Academia com tradição em promover saúde e bem-estar.', '777-777-7777', 55.755825, 37.617298),
(gen_random_uuid(), 'Companhia Athletica', 'Academia de alto padrão com diversas modalidades esportivas.', '888-888-8888', 40.416775, -3.703790);

INSERT INTO "users" (id, name, email, passoword_hash, created_at) VALUES
(gen_random_uuid(), 'João Silva', 'joao.silva@example.com', 'hash1', now()),
(gen_random_uuid(), 'Maria Oliveira', 'maria.oliveira@example.com', 'hash2', now()),
(gen_random_uuid(), 'Carlos Pereira', 'carlos.pereira@example.com', 'hash3', now()),
(gen_random_uuid(), 'Ana Souza', 'ana.souza@example.com', 'hash4', now()),
(gen_random_uuid(), 'Pedro Santos', 'pedro.santos@example.com', 'hash5', now()),
(gen_random_uuid(), 'Juliana Lima', 'juliana.lima@example.com', 'hash6', now()),
(gen_random_uuid(), 'Ricardo Alves', 'ricardo.alves@example.com', 'hash7', now()),
(gen_random_uuid(), 'Fernanda Costa', 'fernanda.costa@example.com', 'hash8', now()),
(gen_random_uuid(), 'Bruno Rocha', 'bruno.rocha@example.com', 'hash9', now()),
(gen_random_uuid(), 'Paula Mendes', 'paula.mendes@example.com', 'hash10', now()),
(gen_random_uuid(), 'Lucas Ferreira', 'lucas.ferreira@example.com', 'hash11', now()),
(gen_random_uuid(), 'Camila Barbosa', 'camila.barbosa@example.com', 'hash12', now());
