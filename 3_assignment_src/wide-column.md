
With the focus on querying specific type of information, this focuses on the customers order.
The CustomerID (CID) is the partition key that determines the storage location or principles based on which the data is stored, and with the order ID and line ID being the clustering keys that determine the organization within the partition. 
The actual data is contained in the rows' attributes.

+---------------+----------------+----------------+------------------------------------------+
| Partition Key | Clustering Key | Clustering Key | Attributes                               |
+---------------+----------------+----------------+------------------------------------------+
|     CID       |     OID        |  LINE_ID       | O_DATE, O_TOTAL, PID, P_NAME, PRICE, QTY |
+---------------+----------------+----------------+------------------------------------------+

