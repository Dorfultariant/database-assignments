With the focus on querying specific type of information, each table for specific query:

**This focuses on the customers order.**
The CustomerID (CID) is the partition key that determines the storage location or principles based on which the data is stored, and with the order date, order id and line ID being the clustering (row) keys that determine the organization order within the partition, so the partition is sorted based on the order date, then at the same dates based on the orderid and then the lineid.

The actual data is contained in the rows' attributes.

As the data is partitioned based on the customer ID, having the customers information as a single entry (STATIC) for the partition reduces dublication, though this does not provide "snapshot" of the customer state at the time of purchase. src: https://axonops.com/docs/data-platforms/cassandra/data-modeling/concepts/#static-columns

+---------------+----------------+----------------+----------------+-----------------------------------+
| Partition Key | Clustering Key | Clustering Key | Clustering Key | Attributes                        |
+---------------+----------------+----------------+----------------+-----------------------------------+
|     CID       |     O_DATE     |      OID       |    LINE_ID     | O_TOTAL, PID, P_NAME, PRICE, QTY  |
+---------------+----------------+----------------+----------------+-----------------------------------+
| STATIC: NAME, ADDRESS(STREET, CITY, STATE, COUNTRY), PHONES[]                                        |
+---------------+----------------+----------------+----------------------------------------------------+


**This focuses on the order query**

+---------------+----------------+------------------------------------------------+
| Partition Key | Clustering Key | Attributes                                     |
+---------------+----------------+------------------------------------------------+
|     OID       |    LINE_ID     | CID, O_DATE, O_TOTAL, PID, P_NAME, PRICE, QTY  |
+---------------+----------------+------------------------------------------------+


**This focuses on the customer query**

+---------------+----------------+--------------------------------------------------+
| Partition Key | Clustering Key | Attributes                                       |
+---------------+----------------+--------------------------------------------------+
|     CID       |     NAME       | ADDRESS(STREET, CITY, STATE, COUNTRY), PHONES[]  |
+---------------+----------------+--------------------------------------------------+

