# Architectures for each scenario

## 1. Streaming platform

As such platforms can have customers to different countries with different legislations regarding the media and different locations might focus on specific type of content, which would make Content-Delivery-Networks (CDN) a viable system to have the content relatively close to the place of usage, so a distributed database architecture with regional databases. This would mean data replication to different regions and geographic fragmentation to regional databases. There would be additionally different databases that hold the different types of data, e.g. authentication, profile information, video / streaming information.

## 2. Data analytics 

Some data warehouse could provide useful as the data would be stored in different databases, go through a mangler and provide useful analytics for the company. Another could potentially be datalake-like architecture where the different datasources are combined as is in raw format to a single "lake" from which the data can be queried and processed for further usage within the company. If the input data needs to remain in raw format and processing should allow realtime-ish processing, then datalake would be the better option as there can be more overhead with data warehouse setup due to data formatting from raw to warehouse db model and loading. Fragmentation could be done based on the source or regional if the data is gathered from multiple geographical locations. If the active dataset is not the whole accumulated data, older data could be replicated to some other datawarehouse for historical storage.  

## 3. LUT University organizational platform

If each location are capable of holding on to their own data, a P2P distributed architecture could theoretically be usable, as long as the peers are just the other campus locations with each acting as authorative to their data and VPN connection between them would be used (improves security). This would reduce the requirements for a centralized data storage and each campus would be handling their own data while allowing other campuses to utilize it. A standardized format of delivery would be required and interfaces are required for differing parts to properly utilize the data between campuses. The data shared between campuses is the replication part and fragmentation is the campus specific information e.g. each student belonging to specific campus. 

## 4. Factory system, material processing

For a factory setting, depending on what specific use-case it would be for, a data stream archtecture could provide useful if the transmissions are event-based where a processing line needs to keep count of processed materials and statistics of the production. In this scenario, the different parts of the processing can have their data streams send to a processing unit that further mangles the data to its correct place, this could be potentially be useful for realtime-ish factory monitoring, with the transferal and processing latency. Fragmentation could be categorized based on the type of data to be stored, e.g. monitoring, production statistics and inventory and replication from those to a centralized place for governing.
