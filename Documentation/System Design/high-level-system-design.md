---
source: YouTube
topic: High-Level System Design
status: needs-rewrite
---

# High-Level System Design

This video uses the example of opening and scaling a pizza restaurant to explain solutions to problems that arise when building an engineering system.  
It maps those real-world solutions to technical concepts such as vertical scaling, horizontal scaling, microservices, distributed systems, load balancing, decoupling, logging, metrics, and extensibility.

---

## Building a System Through a Restaurant Example

> [!abstract]
> The video starts with a real-world example of opening a restaurant and uses the problems that arise as the business grows to introduce their technical counterparts.

Usually, when you're building and engineering a system, there is some sort of background behind it. The example used is opening a restaurant.

Consider a pizza parlour with just **one chef**.

There comes a point when one chef cannot handle all the orders that all the new customers are bringing in.

> [!question] My thoughts
> 
> 

---

## Vertical Scaling

If you think like a manager, the first thing you are going to do is ask the chef to **work harder**. You can pay them more and put in more money, and they give you more output.

The goal is to:

- Optimize processes.
- Increase throughput.
- Use the same resource.

When you think of the chef as a computer, and put this in technical terms, this is called **vertical scaling**.

> [!tip] Core idea
> **Vertical scaling** means increasing the output of the same resource by optimizing it or giving it more resources.

> [!question] My thoughts
> 
> 

---

## Preprocessing Using Cron Jobs

Speaking of optimizing processes, some things can be done beforehand.

When an order comes in, you do not need to actually make the pizza base at that moment.

The pizza base can be **pre-made and prepared beforehand during non-peak hours**.

The reason for doing this during non-peak hours is that you do not want a regular order to come in while the chef is busy making the pizza bases.

Around **4:00 AM** in the night is a good time because you surely will not have any pizza orders at that time.

> [!tip] Core idea
> Prepare work in advance during periods when the system is not busy so that the main resource can handle incoming work during peak hours.

> [!question] My thoughts
> 
> 

---

## Backup Servers

Now that the system is set up, the next problem is making it **resilient**.

Suppose the chef calls in sick one day. At this point, the business is in trouble because there will not be any business that day.

The chef is a **single point of failure**.

A solution is to hire a **backup chef** in case the main chef does not come.

The backup chef can be employed for that day only and paid for that day.

The chance of losing business is then really low because there is not just one chef, but also a backup.

> [!warning] Single Point of Failure
> A single point of failure is a component whose failure can prevent the system from operating.

For computers:

- Keep backups.
- Avoid single points of failure.

This is compared to a **master-slave architecture**:

- Master chef
- Slave chef

> [!note] Terminology from the example
> The speaker describes the backup arrangement as something like a master-slave architecture, using the master chef and slave chef as the analogy.

If the business keeps growing, the backup chef should eventually become a full-time chef. In fact, more chefs should be hired.

> [!question] My thoughts
> 
> 

---

## Horizontal Scaling

Instead of having one chef, imagine having **10 chefs and a few in backup**.

This maps to **horizontal scaling**.

**Horizontal scaling** is buying more machines of similar types to get more work done.

For example:

- Chef 1
- Chef 2
- Chef 3
- And additional chefs as the system grows

> [!info] Definition
> **Horizontal scaling** means adding more machines or resources of similar types to increase the amount of work the system can handle.

> [!question] My thoughts
> 
> 

---

## Microservices

Suppose there are three chefs:

- Chef 1
- Chef 2
- Chef 3

They have different specialties.

- Chefs 1 and 3 are experts at making **pizzas**.
- Chef 2 specializes in **garlic bread**.

There are two types of incoming orders:

- Pizza
- Garlic bread

The question is how to route these orders.

### Random Assignment

One option is to randomly assign orders.

For example:

- A garlic bread order could go to Chef 1.
- A pizza order could go to Chef 2.

However, this is **not the most efficient way to use the employees**.

### Routing by Specialization

Instead, build on the strengths of the chefs:

- Route all **garlic bread orders** to Chef 2.
- Route all **pizza orders** to Chefs 1 and 3.

This makes the system simpler.

For example:

- If a change is needed in the garlic bread recipe, you only need to notify Chef 2.
- If you need the status of any garlic bread order, Chef 2 is the person you ask.

You can also create a team of chefs who specialize in garlic bread.

Maybe only **three chefs** are needed for garlic bread because the number of orders is going to be lower.

For pizzas, the remaining **seven chefs** can be distributed into teams of three and four.

They are good at making pizzas and receive all the pizza orders.

What is happening is that each team is being **scaled at a different rate**, while responsibilities are also being divided.

This is called a **microservice architecture**.

> [!info] Microservice Architecture
> A microservice architecture has responsibilities that are well-defined and divided among specialized parts of the system.

At this point:

- Responsibilities are well-defined.
- Each team handles its specific responsibility.
- There is nothing outside its business use case that it handles.

> [!tip] Core idea
> Divide responsibilities so that specialized parts of the system can be scaled independently according to their workload.

> [!question] My thoughts
> 
> 

---

## Distributed Systems

The pizza shop is now doing really well:

- It can handle all orders within time.
- It has specialists for everything.
- The different parts can be scaled easily.

The business is scalable to a large extent.

But what happens if there is an **electricity outage** in the pizza shop?

There will be no business that day.

What happens if the shop **loses its license for a day**?

Again, there will be no business that day.

The solution is to distribute the system.

> [!quote] Key principle
> “You don't wanna put all your eggs in one basket, not even in one shop.”

Buy a separate shop in a different place that can also deliver pizzas.

It may have disadvantages:

- It may take more time.
- The number of chefs there may be smaller.

But it provides a backup.

The backup is taken to a different level by opening a **new shop**.

This introduces a lot of complexity because there sometimes needs to be communication between the shops.

You need to be able to route requests.

For example, when a pizza request arrives, you need to determine:

- Should the order go to this shop?
- Should the order be sent to the other shop?

This is a **distributed system**.

### Advantages of Distribution

One clear advantage is that orders close to a particular shop can be served by that shop.

In a large-scale distributed system such as **Facebook**, requests come from all around the world and need quick response times.

You need some sort of **local servers everywhere**.

That is what distribution provides.

The system is distributed so that it:

- Is more **fault tolerant**.
- Provides **quicker response times**.

The example now has:

- Pizza Shop 1
- Pizza Shop 2
- Delivery agents
- Customers

> [!question] My thoughts
> 
> 

---

## Load Balancing

Every time a customer makes a request, the request needs to be sent to either Shop 1 or Shop 2.

The customer is not going to take responsibility for deciding which shop should receive the request.

Instead, the request should be sent to someone else, perhaps a **central place that routes requests**.

The requests should not simply be sent randomly.

### Routing Parameter

There is a clear parameter:

**How much time does it take for the customer to get the pizza?**

That is the parameter.

Consider the two shops:

| Shop | Queue Wait | Preparation | Delivery | Total |
|---|---:|---:|---:|---:|
| Pizza Shop 1 | 1 hour | 5 minutes | 10 minutes | 1 hour 15 minutes |
| Pizza Shop 2 | Short wait | — | — | 1 hour 5 minutes |

Pizza Shop 1 is a really popular shop.

For Shop 1:

- It may take **1 hour** to wait in the queue.
- It takes **5 minutes** to make the pizza.
- It takes **10 minutes** to deliver the pizza from Shop 1 to the customer.
- Total time is **1 hour 15 minutes**.

Pizza Shop 2 has a really short wait time.

The total time required there is **1 hour 5 minutes**, which is less than the **1 hour 15 minutes** required at Shop 1.

Therefore, the central authority should send the request to Shop 2.

As long as the central authority receives **real-time updates**, it can make intelligent business decisions, which means more money.

The thing that routes requests in a smart way is called a **load balancer**.

> [!info] Load Balancer
> A load balancer routes requests intelligently based on parameters such as how long it will take for the customer to receive the pizza.

> [!question] My thoughts
> 
> 

---

## Decoupling

At this point, the delivery agent and the pizza shop have almost nothing in common.

It could be:

- A pizza shop.
- A burger shop.

The delivery agent only wants to **deliver goods as quickly as possible to the customer**.

Similarly, the pizza shop does not care whether:

- A delivery agent comes to pick up the order.
- The customer themselves comes to pick it up.

This shows a **separation of responsibilities**.

Instead of having the same managers manage:

- The pizza shop.
- The delivery agents.

The management should be separated.

This is called **decoupling the system**.

**Decoupling** means separating concerns so that separate systems can be handled more efficiently.

> [!tip] Core idea
> ==Separate responsibilities so that each system can be handled independently and efficiently.==

> [!question] My thoughts
> 
> 

---

## Logging and Metrics Calculation

Suppose Pizza Shop 1 has a **faulty oven**.

Its churning rate goes down.

If a delivery agent has a **faulty bike**, that particular delivery agent's order times may increase.

At this point, you want to **log everything**.

You want to know:

- At what time something happened.
- What the next event was.
- What happened after that.
- And so on.

You also want to take those events, **condense them**, and find meaning in those events.

That is **metrics**.

> [!info] Logging vs. Metrics
> - **Logging:** Recording events, including when something happened and what happened next.
> - **Metrics:** Taking those events, condensing them, and finding meaning in them.

> [!question] My thoughts
> 
> 

---

## Extensibility

The final and most important point is to keep the system **extensible**.

As a backend engineer, you do not want to rewrite all the code again and again to serve a different purpose.

For example, a delivery agent does not need to know that they are delivering a **pizza**.

It could be a **burger tomorrow**.

> [!example] Example
> The delivery system should be useful without being tied specifically to pizza. Tomorrow, the same delivery agent could deliver a burger.

Think about **Amazon**.

Earlier, Amazon used to deliver only **parcels**.

The reason why you can scale out your business is because you want to **decouple everything** to make sure that your system is extensible.

> [!tip] Core idea
> ==Decouple the system so that it can be extended to serve new purposes without rewriting everything.==

> [!question] My thoughts
> 
> 

---

## From Business Problems to System Design

The approach taken in the video is:

1. Take a **business scenario**.
2. Find solutions to all the problems that arise from it.
3. Map those solutions into **technical terms**.
4. Use those technical solutions as counterparts to the original business problems.
5. Scale the restaurant at a high level.
6. Define what kinds of problems the system faces and how those problems will be solved.

These solutions are themselves the technical counterparts of the business problems.

> [!abstract]
> The restaurant example is used to show how real-world scaling and reliability problems can be translated into technical system-design solutions.

This is known as **high-level design**.

> [!question] My thoughts
> 
> 

---

## High-Level System Design vs. Low-Level System Design

There is a counterpart to high-level design called **low-level design**.

### High-Level System Design

High-level system design is what the speaker talks about on the channel.

It includes things such as:

- Deploying on servers.
- Figuring out how two systems will interact with each other.

### Low-Level System Design

Low-level system design has much more to do with **how you are actually going to code the system**.

It includes:

- Making classes.
- Making objects.
- Making functions.
- Defining function signatures.

These things are pretty important if you are a **senior engineer**.

Even if you are not a senior engineer, if you want to reach the senior engineering level, you need to know how to write **efficient and clean code**.

> [!warning] Distinction
> High-level design focuses on the system and how its components interact, while low-level design focuses more on how the system is actually implemented in code.

> [!question] My thoughts
> 
> 

---

## Questions to answer

1. Why is asking the chef to work harder an example of vertical scaling?



2. Why are pizza bases prepared during non-peak hours, and what problem would occur if they were prepared during peak hours?



3. Why is a single chef considered a single point of failure, and how does a backup chef solve the problem?



4. Why is routing pizza and garlic bread orders according to chef specialization more efficient than randomly assigning orders?



5. Why does opening a second pizza shop introduce more complexity, and what advantages does distribution provide?



6. How does the load balancer decide between Pizza Shop 1 and Pizza Shop 2 in the example?



7. Why does separating the pizza shop from the delivery agents represent decoupling, and how does this help extensibility?



8. What is the difference between high-level system design and low-level system design according to the video?


