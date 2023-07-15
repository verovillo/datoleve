import mysql.connector
import json


conn = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "",
    port = "3308",
    database  = "clientesbarental"
)

cursor = conn.cursor()

# ----------------------------------Leer el archivo JSON
with open(r"C:\Users\User\Desktop\Project\BA-Rental.github.io\JS\clientes.json") as archivo:
    objeto_json = archivo.read()

# --------------------------------Convertir el JSON a objeto Python
objeto = json.loads(objeto_json)

# ---------------------------------Se creo la base de datos
# cursor.execute("CREATE DATABASE clientesbarental")
# cursor.execute("SHOW DATABASES")
# for bd in cursor:
#  print(bd)

#---------------------------Crear Tabla para la base de datos

# col = """CREATE TABLE clientes (nombre VARCHAR (300), mail VARCHAR(300), apellido VARCHAR(300), contraseña VARCHAR(200))"""

#-------------------------------------Insertar Valores del Json a la Tabla

col = """INSERT INTO clientes(nombre,mail,apellido,contraseña) VALUES(%s, %s, %s, %s)"""
#contraseÃ±a

tamaño = len(objeto)

# valores = []

for i in range (tamaño):
 nombre = objeto[i]["nombre"]
 apellido = objeto[i]["apellido"]
 correo = objeto[i]["correo"]
 contraseña = objeto[i]["contraseÃ±a"]
 valores = (nombre,correo,apellido,contraseña)
 cursor.execute(col,valores)

conn.commit()

muestra = "SELECT * FROM clientes"
cursor.execute(muestra)


for row in cursor.fetchall():
 nombre = row[0]
 mail = row[1]
 apellido = row[2]
 contraseña = row[3]
 print(f"Nombre: {nombre}, Mail: {mail}, Apellido: {apellido}, Contraseña: {contraseña}")


cursor.close()
conn.close()