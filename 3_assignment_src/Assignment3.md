Discuss the advantages and disadvantages of a relational database, document (json) database, graph database and wide-column database in terms of:

1. Database administration (modifying data and data model)
2. Query management and complexity
3. What if the product can be made of several products e.g. a twelve pack of soda is a collection of individual sodas.
    Discuss the implications to the aforementioned database systems


Relational

1. Database administration (modifying data and data model)

Requires good knowledge about the projected structure of the data model before implementation as changes are harder and require good administration practices for operation and maintainability.

Modifying data is easy with good design, each table have their constraints defined and ACID process ensures atomicity, concistency, isolation and durability for the data storage.
However, due to the constraints and integrity checks, model changes become harder and require alterations and query changes and migration to accomodate the changes in model.

2. Query management and complexity

Querying is easy with SQL as the tables can be joined and views can be created for common data reads, requires knowledge about efficient SQL querying and in which order joins happen and recursion as large datasets can have bad performance otherwise.

3. What if the product can be made of several products e.g. a twelve pack of soda is a collection of individual sodas.
    Discuss the implications to the aforementioned database systems

Many-to-many relationship which is native to SQL based databases, though recursion might become issue if lets say a product consists of multiple different products but for a product of "12-pack soda" containing one child product of "soda" is quite simple reference to the two products and the quantity of child item. This could be its own table that joins the parent product and child product with additional quantity and other required information. 


Document

1. Database administration (modifying data and data model)

Changing some common information requires the dedicated update to all referencing objects, for the snapshot style order, the data at the time of purchase can remain even if customers current information change but they are not consistent across objects.

Data model change is easy as the object format is not ensured to be consistent but having different models for the objects requires handling the differences within the application logic as old and new models coexist.

2. Query management and complexity

Queries happen via application logic or via aggregated format ie. the "order information" which gives orders related information in a single read but other aggregates might require the application logic way unless designed for the object models. So, with relational information the queries can become more complex and difficult unless planned around initially and require multiple reads.

3. What if the product can be made of several products e.g. a twelve pack of soda is a collection of individual sodas.
    Discuss the implications to the aforementioned database systems

This can be made into a object model change by adding the quantity and product identifier to get the "soda" to "12-pack soda", results to model versioning, or by adding a new object model containing the reference to the product and quantity resulting in turn to multiple reads.




Graph

1. Database administration (modifying data and data model)

With additional properties, new nodes can be made and connected via edge and with constraints so realatively easy data model modification, and changing data is just changing the nodes property value so also easy.

2. Query management and complexity

Relationship focused queries are easy in the network, but multi aggregates can become more difficult as the graph databases arent designed around it and might require separate query language.

3. What if the product can be made of several products e.g. a twelve pack of soda is a collection of individual sodas.
    Discuss the implications to the aforementioned database systems

Should be quite easy as the quantity can be CONTAINS property of the edge between the two products (nodes) and the relationship is straightforward for the graph.


Wide-column

1. Database administration (modifying data and data model)

For data modification, writes are fast, but due to denormalization, the updates are done for each row which is slower. For model changes, it is hard to modify existing partition and clustering keys as the tables are build around them which would be essentially taking the foundation of a house, so requires the creation of new tables for data model changes, though the column additions are easy as attribute columns aren't enforced. 

2. Query management and complexity

As the datamodeling is query-based, new or alternative queries require most likely new tables which dublicates and denormalises the data and makes it harder to get information unless it has been design from the getgo. Reads of existing query formats is fast and easy.


3. What if the product can be made of several products e.g. a twelve pack of soda is a collection of individual sodas.
    Discuss the implications to the aforementioned database systems

A new table for the product and quantity would probably be the way to go, though the joins are inefficient, which can be solved by data dublication, which results to denormalization. With additional products, this becomes more difficult and is rreally inefficient.




