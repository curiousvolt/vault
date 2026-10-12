---
source: YouTube
topic: Intro to Probability - 1
status: v1.0
link: https://youtu.be/RXMMGj7VAdo
---
## Why Study Probability?
### Probability and Uncertainty

At school, probability is often introduced using a definition such as:

$$
P(\text{event}) = \frac{\text{number of favourable outcomes}}{\text{total number of outcomes}}
$$

The lecture takes a step back from this familiar definition to examine why probability is needed and to establish formal definitions of terms such as *event*.

Probability becomes relevant when an experiment can have **multiple possible outcomes**. If an experiment has only one possible outcome, there is no uncertainty about which outcome will occur.

For example, someone planning to go for a walk may want to know whether the weather will be too sunny or rainy. They may ask:

- What are the chances that it will rain?
- What are the chances that it will remain sunny?

The speaker notes that when people are asked, “What is probability?”, a common answer is “the chance of occurrence of an event.” But this leads to another question: “What is an event?” Simply describing an event as “anything that happens” is not a sufficient formal definition. The lecture will establish formal definitions.

### Examples of questions involving probability

Probability can be used to ask questions about several situations:

- **Coin toss:** What are the chances of getting a head or a tail?
- **Rolling a die:** What are the chances of getting a one, a six, or another number?
- **Surgery:** What are the chances that a surgery will be successful? What are the chances that it will fail?
- **Weather:** What are the chances of rain or sunshine, and should an umbrella be taken?
- **Travel time:** What are the chances of reaching a destination within a specified time?
- **Cricket:** After a toss, should a team bat first or bowl first?
- **Medical testing:** A pathology report may describe the chances associated with a disease or results that may be clinically corroborated.
- **College and branch selection:** Given marks and several available options, what are the chances of getting a particular department at a particular university?

These are questions people may want to assess before making a decision.

### Studying and quantifying uncertainty

The speaker describes probability as the **study of uncertainty**. It is also a way to **quantify uncertainty**: a numerical value indicates how likely something is to happen or not happen.

The goal is not merely to study uncertainty. It is to use probability to make decisions when the outcome is uncertain.

> [!abstract] Main idea
> Probability helps us study and quantify uncertainty so that we can make decisions in its presence.

### Decisions under uncertainty

#### Travel-time example

Suppose someone wants to travel from one place in a city to another and wants to know the chances of reaching the destination within 30 or 35 minutes of starting. To estimate these chances, they would consider traffic and other parameters that can affect the journey.

#### Cricket toss example

In a cricket match, the captains first take part in a toss. Based on the outcome, the captain who wins decides whether the team will bat first or bowl first. The decision is made in the presence of uncertainty.

#### Machine-learning example

Probability is important in machine learning because machine-learning systems attempt to **predict** and **classify**.

- A classification system may make an error. Probability can be used to quantify that uncertainty.
- A prediction may not be accurate. Probability can be used to quantify the uncertainty associated with the prediction.

The speaker emphasizes that these decisions and predictions are not guaranteed to be correct because different outcomes remain possible.

## Random Experiments

> [!question] My thoughts
>
>

### Definition

A **random experiment** is an experiment with a known set of possible outcomes, where the particular outcome of a trial is unknown before the trial is conducted.

The randomness is associated with having multiple possible outcomes. It does not mean that the experiment has no known structure.

- The possible outcomes must be known.
- There must be more than one possible outcome.
- Before conducting a trial, we cannot predict with certainty which of the possible outcomes will occur.

> [!info] What is random?
> What is unknown is the outcome of a trial before the trial is conducted.

### Coin-toss example

When tossing a coin, the possible outcomes are known: a head or a tail. Before tossing it, however, we cannot say which outcome the trial will produce.

Even if a coin toss produces a head now, tossing the coin again at the same time on a Tuesday several weeks later does not allow us to predict the next outcome in advance. The outcome of the new trial remains unknown beforehand.

### Random experiment versus deterministic experiment

A random experiment has multiple possible outcomes. If an experiment has only one possible outcome and produces that same result every time, it is **deterministic**, rather than random in the sense used in this lecture.

### Examples of random experiments

#### 1. Tossing a coin

- Possible outcomes: head and tail.
- The outcome of an individual toss cannot be predicted with certainty in advance.

#### 2. Rolling a six-faced die

- Possible outcomes: \(1, 2, 3, 4, 5, 6\).
- There are six possible outcomes.
- Before rolling the die, we cannot predict with certainty which outcome the trial will produce.

> [!tip] Exhaustive list of outcomes
> Before conducting a random experiment, list every possible outcome. The speaker says that the list must be complete: there should not be an unlisted surprise outcome.

## Sample Space and Outcomes

> [!question] My thoughts
>
>

### Definition of sample space

The **sample space** is the set of all possible outcomes of a random experiment. It is typically denoted by \(\Omega\) (omega) or \(S\).

$$
\text{Sample space} = \{\text{all possible outcomes of a random experiment}\}
$$

The sample space must contain the complete list of possible outcomes.

### Examples of sample spaces

| Random experiment | Sample space |
|---|---|
| Tossing a coin | \(\Omega = \{H,T\}\), where \(H\) is head and \(T\) is tail |
| Rolling a six-faced die | \(\Omega = \{1,2,3,4,5,6\}\) |
| Throwing a dart at an interval | The possible landing points in the interval from \(a\) to \(b\) |
| Measuring the lifetime of a bulb in hours | \(\Omega = \{t \mid t \geq 0\}\) |

### Dart landing on an interval

Consider the real line and an interval from \(a\) to \(b\). A dart is thrown, and the experiment records the point where it lands within that interval.

The outcome is the point at which the dart falls. The speaker focuses on the interval \((a,b)\) and uses it to illustrate a sample space whose possible outcomes are points along an interval.

> [!missing] Not in transcript
> The speaker refers to a drawing of the real line, the interval from \(a\) to \(b\), and the dart's landing point. The exact drawing and any endpoint details beyond the spoken description are not available in the transcript. Check the video at this point.

### Lifetime of a bulb

Consider the experiment of measuring the lifetime of a bulb in hours. The time \(t\) can be any non-negative value.

$$
\Omega = \{t \mid t \geq 0\}
$$

The lifetime can be specified in hours, minutes, or another time unit; the example uses hours.

### Outcomes

Every element of the sample space is called an **outcome**.

- The sample space is the set of all possible outcomes.
- An individual element of that set is one outcome of the experiment.

For example, in a die-rolling experiment, each of \(1,2,3,4,5,6\) is an outcome.

## Events as Subsets of the Sample Space

> [!question] My thoughts
>
>

### Why consider subsets?

Instead of always asking about one individual outcome, we may be interested in a group of outcomes. Such a group is a **subset of the sample space**.

For example, when rolling a six-faced die, the sample space is:

$$
\Omega = \{1,2,3,4,5,6\}
$$

Suppose the question is about obtaining an odd number rather than obtaining a specific number. Define:

$$
A = \{1,3,5\}
$$

where \(A\) is the set of odd outcomes, and:

$$
B = \{2,4,6\}
$$

where \(B\) is the set of even outcomes.

The question “What is the chance of getting an odd number?” is then a question about obtaining an outcome in \(A\): getting a \(1\), \(3\), or \(5\). Similarly, \(B\) represents the outcomes corresponding to an even number.

### Number of subsets of a finite set

For a finite set with \(n\) elements, the number of possible subsets is \(2^n\).

For a sample space \(\Omega\), the number of subsets is:

$$
\text{Number of subsets of }\Omega = 2^{|\Omega|}
$$

Here, \(|\Omega|\) denotes the **cardinality** of \(\Omega\), meaning the number of elements in the set.

For the die-rolling sample space, there are six elements:

$$
|\Omega| = 6
$$

Therefore:

$$
2^{|\Omega|} = 2^6 = 64
$$

There are **64 subsets** of a sample space containing six elements.

These subsets include:

- The empty set.
- All one-element subsets (singletons).
- All two-element subsets.
- All three-element subsets.
- All four-element subsets.
- All five-element subsets.
- The six-element subset, which is the sample space itself.

In the example, the speaker is interested only in the odd-number subset \(A\) and the even-number subset \(B\), not in the other 62 subsets.

> [!example] Die-rolling example
> The sample space contains six outcomes and therefore has 64 subsets. The questions being considered are specifically the chances of obtaining an odd number or an even number, represented by \(A=\{1,3,5\}\) and \(B=\{2,4,6\}\).

### Definition of an event

The lecture refines the definition of an event to emphasize the subsets of interest.

An **event** is a subset of the sample space that is of interest and to which we associate a probability value.

$$
A \subseteq \Omega
$$

For an event \(A\), its probability is a real number in the interval from zero to one, inclusive:

$$
P(A) \in [0,1]
$$

Thus, the probability of an event can be \(0\), \(1\), or a value between them. In the die example, \(A\) and \(B\) are events because they are the subsets of interest for which we want to ask about probability.

Not every subset needs to be one of the subsets being studied in a particular problem. The speaker's point is that probability is associated with the events of interest in the problem.

> [!info] Formal topics deferred
> The speaker mentions that more fundamental formal concepts include **sigma-algebras** and **Borel sets**, but does not develop them in this lecture. The intention is to recap familiar ideas before formalizing them further.

## Set Theory and Probability Theory: Corresponding Terms

> [!question] My thoughts
>
>

The speaker distinguishes between set-theoretic language and probabilistic language. They describe related mathematical structures, but use different terminology.

| Set theory | Probability theory | Meaning in this lecture |
|---|---|---|
| Universal set | Sample space | The set containing all possible elements or outcomes under consideration |
| Subset of the universal set | Event | A collection of outcomes of interest |
| Element of the universal set; singleton outcome | Outcome, also called an atomic event | An individual outcome that cannot be broken into smaller outcomes in the sample space |

In set theory, a collection of elements from the universal set is called a **subset**. In probability theory, a collection of outcomes from the sample space is called an **event**, because it is the kind of collection for which probability is considered.

The individual or atomic elements of the sample space are called **outcomes**. The speaker also refers to them as atomic events.

## Set Operations and Disjoint Events

> [!question] My thoughts
>
>

### Intersection and union

The lecture revisits familiar set-theoretic operations using a sample space \(S\) and two subsets \(A\) and \(B\).

- **Intersection**, \(A \cap B\), refers to the elements that are in both \(A\) and \(B\).
- **Union**, \(A \cup B\), refers to the elements that are in \(A\), in \(B\), or in both.
- The speaker also mentions **complements** as another set operation.

The speaker says that the same kinds of operations will be used for probability theory, where the objects being discussed are events:

- The union of two events.
- The intersection of two events.
- The complement of an event.

> [!missing] Not in transcript
> The speaker refers to a Venn diagram showing the sample space \(S\), subsets \(A\) and \(B\), their intersection, and their union. The transcript does not preserve enough visual detail to reconstruct the exact shading. Check the video at this point.

### Disjoint sets

Two sets \(A\) and \(B\) are **disjoint** if they have no elements in common. Their intersection is the empty set:

$$
A \cap B = \varnothing
$$

The empty set, \(\varnothing\), contains no elements. The speaker also refers to it as the null set.

### Disjoint events

The same idea applies to events in probability theory. Events \(A\) and \(B\) are disjoint when they have nothing in common:

$$
A \cap B = \varnothing
$$

The speaker then connects this set-theoretic condition to probability by stating:

$$
P(A \cap B) = P(\varnothing) = 0
$$

In other words, the probability associated with the empty set is zero. The lecture notes this relationship here and says that a formal definition of probability will be covered in the next lecture.

> [!abstract] Key relationship
> Disjoint events have an empty intersection. In the lecture's notation, the probability of that intersection is zero.

## Lecture Recap and What Comes Next

> [!question] My thoughts
>
>

The lecture began by asking why probability is needed. The answer given was that probability helps us make decisions in the presence of uncertainty.

The key concepts introduced were:

1. **Random experiment:** An experiment with multiple possible outcomes, where the outcome of a trial is not known before the trial.
2. **Sample space:** The set of all possible outcomes of a random experiment.
3. **Outcome:** An individual element of the sample space.
4. **Event:** A subset of the sample space that is of interest and to which a probability value is assigned.
5. **Number of subsets:** A finite set with \(n\) elements has \(2^n\) subsets. For a six-element sample space, this is \(2^6=64\).
6. **Probability value:** The probability associated with an event is a real number in \([0,1]\).
7. **Set-theory correspondence:** The universal set corresponds to the sample space, subsets correspond to events, and individual elements correspond to outcomes.
8. **Disjoint events:** Two events with an empty intersection satisfy \(P(A \cap B)=P(\varnothing)=0\), as stated in the lecture.

The lecture has established basic terminology and relationships but has **not yet formally defined probability**. The next lecture will define probability and continue with further probability concepts.

## Questions to answer

1. Why does probability become relevant when an experiment has multiple possible outcomes, and how does this connect to making decisions under uncertainty?


2. What makes an experiment random in the lecture's definition, and how does it differ from a deterministic experiment?


3. Why must the sample space contain a complete list of possible outcomes? Explain using one of the examples from the lecture.


4. How do the sample space, outcomes, and events differ from one another?


5. Why does a sample space with six elements have \(64\) subsets, and which two subsets were of interest in the die-rolling example?


6. How do the terms universal set, subset, and element correspond to sample space, event, and outcome in probability theory?


7. What does it mean for two events to be disjoint, and what relationship does the lecture state between their intersection and its probability?


8. Why does the speaker say the lecture has prepared the groundwork for defining probability rather than completing that definition?


