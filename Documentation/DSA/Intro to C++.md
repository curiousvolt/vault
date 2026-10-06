## 1. The Skeleton of a C++ Program

Every C++ program follows the same basic skeleton:

```cpp
#include <iostream>   // needed to take input / give output

int main() {
    // your code here
    return 0;
}
```

- `#include <iostream>` gives you access to input/output functionality (`cin`, `cout`).
- Similarly, other libraries are included the same way, e.g.:
    - `#include <math.h>` → for mathematical functions
    - `#include <string>` → for string operations
- You don't need to know what's _inside_ a library — just include it if you need its functionality.

### The "include everything" shortcut

Instead of including libraries one by one, you can include **all** of them at once:

```cpp
#include <bits/stdc++.h>
```

- This bundles every standard library together.
- It takes a _little_ more compile time, but that's negligible compared to program run time.

---

## 2. Basic Input / Output

### Printing with `cout`

```cpp
#include <iostream>

int main() {
    std::cout << "hey striver";
    return 0;
}
```

- `cout` needs `std::` prefix because it belongs to the `std` namespace.
- `<<` is the "insertion operator" — it sends data to output.

### Avoiding the `std::` prefix — `using namespace std`

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "hey striver";
    return 0;
}
```

- Once you write `using namespace std;`, you never need to write `std::` before `cout`, `cin`, etc.

### New line: `\n` vs `endl`

```cpp
cout << "hey striver" << "\n";
cout << "hey raj" << endl;
```

- Both move the output to a new line.
- `\n` is generally faster and more commonly used than `endl`, but both work — it's a matter of choice.
- You can chain multiple things in a single `cout`:

```cpp
cout << "hey raj" << endl << "hey striver" << endl;
```

### Taking Input with `cin`

```cpp
int x;
cin >> x;               // takes input into x
cout << "value of x " << x;
```

- `cin >>` means "take input into this variable."

**Multiple inputs at once:**

```cpp
int x, y;
cin >> x >> y;
cout << "value of x and y " << x << " " << y;
```

- Input can be given on the same line or different lines — C++ reads values in order, one by one, regardless of line breaks (whitespace-separated).

---

## 3. Data Types

### Integers

```cpp
// int : stores whole numbers within a certain range
int x = 10;

// comments in C++
// single-line comment: use //
/* multi-line
   comment */
```

- Variable names can be anything **except** starting with a number — must contain characters (e.g. `raj1` is valid, `1raj` is not).
- `int` has a limited range ($[ -10^{9} , 10^{9}]$, rounded off for memory).

```cpp
long x;        // wider range than int
long long x;   // even wider range 
```

**Rule of thumb (Striver's approach — don't memorize exact bounds):**

| Type        | Approx. Range           |
| ----------- | ----------------------- |
| `int`       | $-10^9$  to $10^9$      |
| `long`      | $-10^{12}$ to $10^{12}$ |
| `long long` | $-10^{18}$ to $10^{18}$ |

> Why not always use `long long`? Because every data type takes up memory — using a bigger type than necessary wastes memory space.

### Floating point numbers

```cpp
float x = 5.6;
double y = 5;       // an int value can also be stored in float/double

cout << "value of y " << y;
```

- `float` and `double` both store decimal numbers; they differ in range/precision (double has a wider range).
- A float/double variable can also store whole numbers.

### Strings and characters

```cpp
string s;
cin >> s;
cout << s;
```

- **Important gotcha:** `cin >> string` only reads up to the first whitespace (space). Typing "hey striver" and reading into one `string s` will only capture `"hey"`.

**Taking two words separately:**

```cpp
string s1, s2;
cin >> s1 >> s2;
cout << s1 << " " << s2;
```

**Taking an entire line (with spaces) — `getline`:**

```cpp
string str;
getline(cin, str);
cout << str;
```

- `getline` reads the whole line until a line break — it will NOT continue reading beyond one `Enter`/newline.

**Character type:**

```cpp
char ch;
cin >> ch;
cout << ch;

char ch = 'g';   // single quotes for a character literal
```

- There are 256 characters in the character set; `char` can store any one of them.
- Strings use double quotes `" "`; characters use single quotes `' '`.
- A single character is stored more memory-efficiently as `char` than as a 1-length `string`.

> **Striver's note:** These data types (`int`, `long`, `long long`, `float`, `double`, `string`, `char`) are enough to solve almost all DSA problems. No need to dig deeper unless a specific problem demands it.

---

## 4. If-Else Statements

### Basic Example — Adult or Not

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int age;
    cin >> age;

    if (age >= 18) {
        cout << "You are an adult";
    } else {
        cout << "You are not an adult";
    }
    return 0;
}
```

- `if` block executes when the condition is true; `else` block executes otherwise.
- `else` is **not mandatory** — you can have an `if` without an `else`.

### `else if` chains — Grading System Example

```cpp
/*
School grading rules:
below 25        -> F
25 to 44        -> E
45 to 49        -> D
50 to 59        -> C  (assumed pattern continues)
... and so on
*/

int marks;
cin >> marks;

if (marks < 25) {
    cout << "F";
} else if (marks >= 25 && marks <= 44) {
    cout << "E";
} else if (marks >= 45 && marks <= 49) {
    cout << "D";
} else if (marks >= 50 && marks <= 59) {
    cout << "C";
}
// ...and so on
```

- `&&` (AND) is used to combine **multiple conditions** that must all be true.
- **Why use plain `if` repeatedly is bad:** if you write separate `if` statements (not `else if`), _every_ condition gets checked even after a match is found — wasting time. Using `else if` stops checking further conditions once one is satisfied.

**Trimming conditions (optimization insight):**

Since ranges are already covered sequentially, you don't need to re-check the lower bound again:

```cpp
if (marks < 25) {
    cout << "F";
} else if (marks <= 44) {          // no need to check >= 25 again
    cout << "E";
} else if (marks <= 49) {          // no need to check >= 45 again
    cout << "D";
} else if (marks <= 59) {
    cout << "C";
}
```

> Logic: if code reaches the `else if (marks <= 44)`, it's _already guaranteed_ that `marks >= 25` failed the previous check — so no need to re-verify it.

### Nested if-else — Job Eligibility Example

```cpp
/*
age < 18                -> not eligible for job
18 <= age <= 54          -> eligible for job
55 <= age <= 57          -> eligible for job but retirement soon
age > 57                 -> (implicitly) retirement time
*/

int age;
cin >> age;

if (age < 18) {
    cout << "not eligible for job";
} else if (age <= 54) {
    cout << "eligible for job";
} else if (age <= 57) {
    cout << "eligible for job but retirement soon";
} else {
    cout << "retirement time";
}
```

**Nested-if version of the same logic** (putting an `if` inside an `else if` block):

```cpp
int age;
cin >> age;

if (age < 18) {
    cout << "not eligible for job";
} else if (age <= 57) {
    cout << "eligible for job";
    if (age >= 55) {
        cout << " but retirement soon";
    }
} else {
    cout << "retirement time";
}
```

- This is called a **nested if** — writing a conditional statement _inside_ another `if`/`else if` block.
- Doesn't necessarily save time, but shows you can nest conditionals as deep as needed for complex logic.

---

## 5. Switch Statement

Used as an alternative to `if-else` chains — mostly for fixed/discrete values. Less commonly used than if-else (if-else is more readable), but good to know.

### Example — Day Number to Day Name

```cpp
int d;
cin >> d;

switch (d) {
    case 1:
        cout << "Monday";
        break;
    case 2:
        cout << "Tuesday";
        break;
    case 3:
        cout << "Wednesday";
        break;
    case 4:
        cout << "Thursday";
        break;
    case 5:
        cout << "Friday";
        break;
    case 6:
        cout << "Saturday";
        break;
    case 7:
        cout << "Sunday";
        break;
    default:
        cout << "invalid";
}
```

### Key concept — `break`

- **Without `break`**, execution "falls through" — once a matching `case` is hit, ALL subsequent case bodies execute too, until a `break` is hit or the switch ends.
    - Example: input `5` without breaks prints `Friday`, `Saturday`, `Sunday` (all fall through).
- **With `break`** after every case, only the matching case's code runs, and then control exits the switch entirely.
- `break` exits out of the entire conditional structure it is inside (here, the switch).

### `default` case

- Executes when none of the listed `case` values match.
- `default` doesn't need its own `break` since it's typically the last thing evaluated — but if you add code after it without a break, that code still executes (fall-through applies to default too).

```cpp
switch (d) {
    case 1: cout << "Monday"; break;
    // ...
    default: cout << "invalid";
}
cout << "check";   // still runs unless default itself has a break before it
```

---

## 6. Arrays

### 1D Arrays

**When to use an array:** when you need to store many values of the _same data type_ — naming 50 separate variables is impractical.

```cpp
int arr[5];   // creates an array of size 5 (indices 0 to 4)

cin >> arr[0] >> arr[1] >> arr[2] >> arr[3] >> arr[4];

cout << arr[3];      // prints the value at index 3

arr[3] = arr[3] + 10; // modify a value (add 10 to element at index 3)
arr[3] = 16;           // or directly reassign
```

- Indexing is **zero-based**: first element is `arr[0]`, and for size `n`, the last valid index is `arr[n-1]`.
- All elements of an array must be of the **same data type**. If you declare an `int` array and try to insert `7.7`, it gets **truncated to `7`** (data loss).
- **Memory layout:** array elements are stored in **consecutive memory addresses**. The starting address of the array itself can be anywhere in memory (randomized), but every subsequent element is guaranteed to be right after the previous one.

### 2D Arrays

```cpp
int arr[3][5];   // 3 rows, 5 columns (5 boxes, 3 times)

arr[1][3] = 76;                 // assign value at row 1, column 3
cout << arr[1][3];              // access value at row 1, column 3
```

- Indexing is **zero-based** for both rows and columns.
- Uninitialized cells contain **garbage values** (whatever was already in that memory).
- 2D arrays are heavily used for matrix problems and graph problems later in DSA.

### Looping over an array (preview - combined with for-loops, see section 9)

```cpp
int arr[5] = {5, 10, ...};
for (int i = 0; i < 5; i++) {
    cout << arr[i] << " ";
}
```

---

## 7. Strings (Character-Indexed Access)

```cpp
string s = "striver";

cout << s[0];   // prints 's'
cout << s[1];   // prints 't'
cout << s[2];   // prints 'r'
```

- Every character of a string is accessible via an index, same as arrays, **zero-based**.
- Last index of a string = `s.length() - 1` (or `s.size() - 1`).

```cpp
int length = s.size();          // or s.length()
cout << s[length - 1];          // prints last character, e.g. 'r' in "striver"
```

**Modifying a character in a string:**

```cpp
s[0] = 'z';   // must assign a CHARACTER (single quotes), not a string
cout << s;    // "ztriver"
```

- Assigning `s[0] = "z"` (double quotes) will throw an error — must use single-quote character literal since you're modifying a single indexed character.

---

## 8. For Loops and While Loops

### Why loops?

Printing the same line 5, 500, or 2500 times by hand is impractical — a loop lets you write the code once and repeat it.

### For Loop Syntax

```cpp
for (int i = 1; i <= 10; i++) {
    cout << "striver ";
}
```

- **Structure:** `for (initialization; condition; increment/decrement)`
- **initialization** (`int i = 1`): runs only once, at the very start.
- **condition** (`i <= 10`): checked before every iteration; loop continues while true.
- **increment/decrement** (`i++`): runs at the end of every iteration.

**Execution trace (for the example above):**

1. `i = 1` (init, once)
2. Check `i <= 10` → true → execute body → prints "striver"
3. `i++` → `i = 2`
4. Check again → repeat...
5. Loop stops when `i` becomes `11` (condition `11 <= 10` is false)

**Scope note:** A variable declared inside the `for(...)` (e.g. `int i = 1`) is _local to the loop_ — it cannot be accessed after the loop ends.

```cpp
int i;   // declare outside if you want to use it after the loop
for (i = 1; i <= 10; i++) {
    cout << "striver ";
}
cout << i;   // accessible here because declared outside; will print 11
```

**Loops can run in any direction / step size — fully flexible:**

```cpp
// reverse loop
for (int i = 5; i >= 1; i--) {
    cout << i << " ";
}

// custom step
for (int i = 1; i <= 25; i = i + 5) {
    cout << i << " ";   // 1, 6, 11, 16, 21
}
```

> Key idea: how you run the loop (step size, direction) is entirely your choice — what matters is that the **condition** is written so the loop runs exactly the number of times you need.

**Nested for-loops** exist too (used heavily for pattern printing) — same nesting concept as nested if-else.

**If-conditions can be written inside for-loops** — any line of code (including `if`) can go inside a loop body.

### While Loop

Same logic as for-loop, different syntax — initialization goes before, condition in the `while(...)`, and increment goes at the end of the loop body.

```cpp
int i = 1;
while (i <= 5) {
    cout << "striver ";
    i++;
}
```

- Same task as a for-loop, only syntax differs.

### Do-While Loop

```cpp
int i = 2;
do {
    cout << "striver ";
    i++;
} while (i <= 1);
```

- **Key difference:** the body executes **at least once**, even if the condition is false from the start.
- Useful when you don't know the condition in advance (e.g., user-dependent input) but still want the code to run a minimum of one time.
- Regular `while` would **not** execute at all if the condition starts false; `do-while` guarantees one execution first, then checks the condition.

---

## 9. Functions — Pass by Value vs Pass by Reference

### Why use functions?

1. **Modularize code** — break large codebases into manageable pieces.
2. **Increase readability** — a well-named function tells others what it does without reading implementation.
3. **Reuse code** — avoid repeating the same lines of code multiple times.

### Types of functions

- **Void, non-parameterized** — does nothing "returnable," takes no input.
- **Void, parameterized** — does nothing "returnable," but takes input(s).
- **Return type, parameterized** — returns a value, takes input(s).
- **Return type, non-parameterized** — returns a value, takes no input.

### Void, non-parameterized

```cpp
void printName() {
    cout << "hey striver";
}

int main() {
    printName();   // calling the function
    return 0;
}
```

- `void` = does not return anything.
- Function is defined outside `main()`, and called from within `main()`.

### Void, parameterized

```cpp
void printName(string name) {
    cout << "hey " << name;
}

int main() {
    string name;
    cin >> name;
    printName(name);   // pass "Raj" -> prints "hey Raj"
    printName("Aman"); // reusability: call with different values
    return 0;
}
```

- Demonstrates **reusability**: same function called multiple times with different arguments instead of repeating `cout` lines.

### Return type function

```cpp
int sum(int num1, int num2) {
    int num3 = num1 + num2;
    return num3;
}

int main() {
    int num1, num2;
    cin >> num1 >> num2;
    int result = sum(num1, num2);
    cout << result;
    return 0;
}
```

**Execution flow trace:**

1. `main()` reads `num1 = 5`, `num2 = 6`.
2. Calls `sum(num1, num2)` → execution jumps into `sum()`.
3. Inside `sum`: `num3 = 5 + 6 = 11` → `return 11`.
4. Control returns to `main()`, `result = 11`.
5. `main()` continues and prints `result` → `11`.

> **Rule:** Any function declared with a return type (e.g., `int`) **must** have a `return` statement on every path. If it doesn't (e.g., an `if` without a matching `return` on all branches), the function returns garbage/undefined behavior.

**Example of the "missing return" pitfall:**

```cpp
int findMax(int num1, int num2) {
    if (num1 >= num2) {
        return num1;
    }
    // missing else / missing return here -> undefined/garbage value
}
```

- Correct version:

```cpp
int findMax(int num1, int num2) {
    if (num1 >= num2) {
        return num1;
    } else {
        return num2;
    }
}
```

> Note: You cannot name your own function the same as an existing built-in function (e.g., avoid naming a custom function `max` if `std::max` already exists) — no duplicate function names allowed.

### Pass by Value vs Pass by Reference

**Pass by Value (default behavior)** — a _copy_ of the variable is sent to the function; changes inside the function do NOT affect the original.

```cpp
void doSomething(int number) {
    cout << number << endl;
    number += 5;
    cout << number << endl;
    number += 5;
    cout << number << endl;
}

int main() {
    int number = 10;
    doSomething(number);
    cout << number << endl;   // still prints 10! original untouched
    return 0;
}
```

- Trace: prints `10`, `15`, `20` inside the function — but back in `main()`, `number` is still `10`, because only a **copy** was modified.
- This also applies to strings:

```cpp
void changeFirstChar(string s) {
    s[0] = 't';
    cout << s << endl;   // shows modified copy, e.g. "traj"
}

int main() {
    string s = "raj";
    changeFirstChar(s);
    cout << s << endl;   // still "raj" - original unaffected
    return 0;
}
```

**Pass by Reference** — using `&` before the parameter name — passes the **original variable's address**, so changes inside the function DO affect the original.

```cpp
void doSomething(int &number) {
    cout << number << endl;
    number += 5;
    cout << number << endl;
    number += 5;
    cout << number << endl;
}

int main() {
    int number = 10;
    doSomething(number);
    cout << number << endl;   // now prints 20 - original WAS modified
    return 0;
}
```

```cpp
void changeFirstChar(string &s) {
    s[0] = 't';
}

int main() {
    string s = "raj";
    changeFirstChar(s);
    cout << s << endl;   // "taj" - original modified
    return 0;
}
```

> **Special case — Arrays:** Arrays are **always passed by reference automatically** in C++ (even without writing `&`). Modifying array elements inside a function always affects the original array.

```cpp
void doSomething(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        arr[i] += 100;
    }
}

int main() {
    int arr[5] = {5, 10, 12, 13, 35};
    doSomething(arr, 5);
    cout << arr[0];   // modified! arrays always behave as pass-by-reference
    return 0;
}
```

> Vectors, maps, lists, and other containers are **NOT** automatically pass-by-reference like plain arrays — you must explicitly use `&` for those if you want the function to modify the original.

---

# PART 2 — C++ STL (Standard Template Library)

## 10. What is STL?

- STL = **Standard Template Library**.
- It's a compiled set of **algorithms, containers, iterators, and functions** in a "minimized" ready-to-use form.
- Instead of writing lengthy code for common containers/algorithms from scratch, you just use STL.
- STL is divided into 4 parts: **Algorithms, Containers, Functions, Iterators**.

Recap of skeleton (same as before):

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    // code
    return 0;
}
```

Recap of function types (void vs return type) — same concept as Part 1, restated briefly:

```cpp
void print() {
    cout << "raj";
}

int sum(int a, int b) {
    return a + b;
}

int main() {
    print();
    int s = sum(1, 5);
    cout << s;   // prints 6
    return 0;
}
```

---

## 11. Pairs

Part of the **utility library**. Used to store two values together.

```cpp
pair<int, int> p = {1, 3};

cout << p.first;    // 1
cout << p.second;   // 3
```

- The data type inside `pair<>` can be anything — `int`, `double`, `string`, `char`, etc.

### Nested pairs — storing 3+ variables

```cpp
pair<int, pair<int, int>> p = {1, {3, 4}};

cout << p.first;          // 1
cout << p.second.first;   // 3
cout << p.second.second;  // 4
```

- You can nest pairs as deep as needed (pair inside pair inside pair...) to store more variables.

### Array of pairs

```cpp
pair<int, int> arr[] = { {1, 2}, {3, 4}, {2, 5} };

cout << arr[1].second;   // 5 (accessing index 1's second element)
```

- `pair` itself can be treated as a data type for arrays/containers.

---

## 12. Vectors

**Why vectors?** Arrays have a **fixed size** at declaration and can't grow. Vectors are **dynamic** — they can grow/shrink at runtime. Use a vector when you don't know the required size in advance.

### Declaration and insertion

```cpp
vector<int> v;
v.push_back(1);     // creates the element, inserts 1
v.emplace_back(2);  // similar to push_back, but generally faster
```

- `push_back` vs `emplace_back`: both insert at the end; `emplace_back` is generally faster (constructs in-place rather than copying).

### Vector of pairs

```cpp
vector<pair<int,int>> vp;
vp.push_back({1, 2});     // needs braces for push_back
vp.emplace_back(1, 2);    // no braces needed for emplace_back — auto-assumed as pair
```

### Declaring with pre-filled size

```cpp
vector<int> v(5, 100);   // 5 elements, each initialized to 100
vector<int> v(5);        // 5 elements, each initialized to 0 (or garbage, compiler-dependent)
```

### Copying a vector

```cpp
vector<int> v1(5, 20);
vector<int> v2(v1);      // v2 is a COPY of v1 (independent container)
```

### Vectors are still dynamic even with pre-defined size

```cpp
vector<int> v(5, 100);
v.push_back(1);    // now size becomes 6 — always allowed
```

### Accessing elements

```cpp
vector<int> v = {20, 10, 15, 5, 7};
cout << v[0];        // 20 (array-style access)
cout << v[3];         // 5
cout << v.at(3);      // same as v[3], but rarely used in practice
```

### Iterators

An iterator points to a **memory address** (not the value itself).

```cpp
vector<int>::iterator it = v.begin();   // points to the memory of the first element

cout << *it;         // dereference: gives the actual VALUE (20)

it++;                // move iterator to next memory location
cout << *it;         // now gives 10

it = it + 2;         // shift iterator by 2 positions
cout << *it;         // gives element 2 positions ahead
```

- `v.begin()` → iterator/pointer to the **first element's memory**.
- Printing the iterator itself gives a memory address; you need `*it` to get the actual value.
- Array/vector elements are stored in **contiguous memory** — so `it++` moves to the immediate next element.

### `end()`, `rbegin()`, `rend()`

```cpp
vector<int> v = {10, 20, 30, 40};

auto it = v.end();     // points to memory RIGHT AFTER the last element (NOT the last element itself)
it--;                  // now points to the last element (40)

auto rit = v.rbegin();   // reverse begin — points to the LAST element, iterating backwards
auto rend = v.rend();    // reverse end — points to memory right BEFORE the first element
```

- `end()` is NOT the last element — it's the position right after it.
- `rbegin()`/`rend()` traverse the vector in reverse. (Striver notes: rarely used in practice, but good to know.)

### `v.back()`

```cpp
vector<int> v = {10, 20, 30};
cout << v.back();   // 30 — the last element
```

### Printing a vector — 3 ways

```cpp
// Way 1: index-based loop
for (int i = 0; i < v.size(); i++) {
    cout << v[i] << " ";
}

// Way 2: iterator-based loop
for (vector<int>::iterator it = v.begin(); it != v.end(); it++) {
    cout << *it << " ";
}

// Way 3: using auto (auto-detects the data type)
for (auto it = v.begin(); it != v.end(); it++) {
    cout << *it << " ";
}
```

### `auto` keyword

```cpp
auto a = 5;         // auto-detected as int
auto s = "raj";      // auto-detected as string/char*
```

- `auto` automatically assigns the correct data type based on the value — saves you from writing explicit (and sometimes long) type declarations.

### For-each loop (range-based for loop)

```cpp
for (auto it : v) {
    cout << it << " ";
}
```

- `it` here directly holds each **value** (not an iterator/address) — no need to dereference with `*`.

### Erasing elements

**Single element:**

```cpp
vector<int> v = {10, 20, 12, 23};
v.erase(v.begin() + 1);   // deletes element at index 1 (i.e., 20)
// v is now {10, 12, 23}
```

**Range of elements:**

```cpp
vector<int> v = {10, 20, 30, 40, 50};
v.erase(v.begin() + 1, v.begin() + 4);
// deletes indices 1, 2, 3 (20, 30, 40); index 4 (the "end" position) is NOT included
// v is now {10, 50}
```

- Erase range convention: **start is included, end is NOT included** (same as most STL range conventions).

### Insert

```cpp
vector<int> v(2, 100);           // {100, 100}
v.insert(v.begin(), 300);        // insert single element at the beginning -> {300, 100, 100}

vector<int> v2 = {10, 20, 30, 40};
v2.insert(v2.begin() + 1, 5);    // insert 5 at index 1 -> {10, 5, 20, 30, 40}

// insert multiple copies of a value
vector<int> v3 = {10, 20, 30, 40};
v3.insert(v3.begin() + 1, 2, 5); // insert two 5's starting at index 1 -> {10, 5, 5, 20, 30, 40}
```

### Copying one vector's contents into another

```cpp
vector<int> v = {30, 10, 10, 100, 100};
vector<int> copy = {50, 50};

v.insert(v.begin(), copy.begin(), copy.end());  // inserts entire "copy" vector at the start of v
```

- You can also insert only a portion by giving a start/end range instead of `copy.begin(), copy.end()`.

### Other common vector functions

```cpp
v.size();     // number of elements
v.pop_back(); // removes the last element
v1.swap(v2);  // swaps contents of v1 and v2
v.clear();    // empties the vector completely
v.empty();    // returns true if vector has 0 elements, false otherwise
```

---

## 13. List

- Same as vector, but **also supports fast front operations** (`push_front`, `pop_front`, `emplace_front`).
- Internally, `list` is a **doubly linked list**; `vector` is like a singly-linked/contiguous array-style structure.
- Because of this, `push_front` on a `list` is cheap, while inserting at the front of a `vector` is costly (needs to shift all elements).

```cpp
list<int> l;
l.push_back(4);
l.push_front(5);      // 5 goes to the front -> {5, 4}
l.emplace_front(6);
```

- All other functions (`begin`, `end`, `rbegin`, `rend`, `size`, `clear`, `empty`, etc.) work the same as in `vector`.

---

## 14. Deque (DQ)

- Similar to `list`/`vector`: supports both front and back operations efficiently.

```cpp
deque<int> dq;
dq.push_back(1);
dq.push_front(2);
dq.pop_back();
dq.pop_front();
// .back(), .front() also available
```

- All functions work similarly to `list`/`vector`.

---

## 15. Stack — LIFO

**LIFO = Last In, First Out.** The last element pushed is the first one to come out.

```cpp
stack<int> st;
st.push(1);
st.push(2);
st.push(3);
st.push(3);
st.emplace(5);     // emplace works like push

cout << st.top();  // 5 (last inserted element) - does NOT remove it
st.pop();           // removes the top element (5)
cout << st.top();  // now 3 (previous top)

cout << st.size();  // number of elements
cout << st.empty(); // true/false

stack<int> st2;
st.swap(st2);        // swaps two stacks
```

- **No index-based access** in a stack — only 3 core operations: `push`, `pop`, `top`.
- `top()` just peeks the top value; `pop()` deletes it.
- All stack operations run in **O(1)** (constant time).

---

## 16. Queue — FIFO

**FIFO = First In, First Out** (like a ticket queue — first person in line gets served first).

```cpp
queue<int> q;
q.push(1);
q.push(2);
q.push(4);

q.back() += 5;     // modifies the LAST element (4 -> 9)
cout << q.back();  // 9

cout << q.front(); // 1 (first element) - does not remove it
q.pop();             // removes the front element
cout << q.front();  // now 2
```

- `front()` = first element (peek); `back()` = last element (peek).
- `pop()` always removes from the **front**.
- All operations are O(1) (constant time), similar to stack.

---

## 17. Priority Queue (Max-Heap by default)

- The **largest** element always stays at the top (for numbers: largest number; for strings: lexicographically largest).

```cpp
priority_queue<int> pq;
pq.push(5);
pq.push(2);
pq.push(8);
pq.push(10);

cout << pq.top();  // 10 (largest)
pq.push(3);          // internally reorganized, doesn't disturb order externally

pq.pop();            // removes the top (largest) element
cout << pq.top();   // next largest, e.g. 8
```

- Internally, a **tree structure** (heap) is maintained — NOT a simple linear container — but its exact internal mechanics are for later (heap topic).
- Functions: `push`, `top`, `pop`, `size`, `empty`, `swap`.

### Min-Heap (priority queue with minimum at top)

```cpp
priority_queue<int, vector<int>, greater<int>> pq;
pq.push(5);
pq.push(2);
pq.push(8);
pq.push(10);

cout << pq.top();  // 2 (smallest)
```

- Terminology: default priority_queue = **Max Heap**; with `greater<int>` = **Min Heap**.

### Time Complexity

|Operation|Complexity|
|---|---|
|push|O(log n)|
|top|O(1)|
|pop|O(log n)|

---

## 18. Set

**Two defining properties: stores elements in SORTED order, and stores only UNIQUE elements.**

```cpp
set<int> st;
st.insert(1);
st.emplace(2);
st.insert(2);   // duplicate - ignored, NOT stored again
st.insert(4);
st.insert(3);   // inserted, but automatically placed in sorted position

// st now internally holds: 1, 2, 3, 4 (sorted, unique)
```

- Internally implemented as a **tree** (not linear storage) — covered further in later lectures.
- `insert` and `emplace` behave the same way (unique + sorted).

### `find`

```cpp
auto it = st.find(3);    // returns an iterator pointing to element 3

auto it2 = st.find(6);   // 6 doesn't exist -> returns st.end()
                            // (an iterator pointing right AFTER the last element)
```

### `erase`

```cpp
st.erase(5);              // erase by VALUE - removes element 5, maintains sorted order

st.erase(st.find(5));     // erase by ITERATOR/address
```

### `count`

```cpp
cout << st.count(1);   // 1 if present (set has unique elements), 0 if absent
```

### Erasing a range

```cpp
// set contains sorted unique elements, e.g. {1, 2, 3, 4, 5}
auto itStart = st.find(2);
auto itEnd = st.find(4);
st.erase(itStart, itEnd);   
// deletes 2 and 3 (start included, end NOT included) -> 4 remains
```

- Other functions (`size`, `empty`, `swap`, `begin`, `end`, etc.) work the same as `vector`.
- `find`, `count`, `insert` are the most-used functions.
- `lower_bound` / `upper_bound` also work on sets (concept explained in a separate linked video — same behavior as on sorted arrays).
- **Time complexity:** All major operations (insert/erase/find) run in **O(log n)**.

---

## 19. Multiset

- Same as `set`, but **allows duplicate elements** (only "sorted" property is kept, "unique" is dropped).

```cpp
multiset<int> ms;
ms.insert(1);
ms.insert(1);
ms.insert(1);   // all three 1's are stored

ms.erase(1);      // ⚠ erases ALL occurrences of 1

cout << ms.count(1);  // counts number of occurrences of 1 in the multiset
```

### Erasing only ONE / a few specific occurrences

```cpp
// erase only 1 occurrence
ms.erase(ms.find(1));

// erase exactly 2 occurrences
auto it = ms.find(1);
auto it2 = next(it, 2);   // conceptually: move 2 positions ahead
ms.erase(it, it2);          // range erase: start included, end not included
```

- All other functions same as `set`.

---

## 20. Unordered Set

- Same as `set` (stores unique elements) **but does NOT maintain sorted order** — order is randomized/unspecified.

```cpp
unordered_set<int> us;
us.insert(1);
us.insert(5);
us.insert(2);
us.insert(3);
us.insert(6);
us.insert(1);   // duplicate - ignored (still unique elements only)
```

- All operations (`insert`, `erase`, `find`, `count`, etc.) work the same as `set`.
- **`lower_bound`/`upper_bound` do NOT work** on `unordered_set` (they rely on sorted order).
- **Time complexity:** Typically **O(1)** for all operations — but in the rare worst case (adversarial input), it can degrade to **O(n)**. This worst case is extremely rare in practice.

---

## 21. Map

Think of it like a class roster: **roll number (key) → student name (value)**.

- Stores data as **key-value pairs**.
- **Keys are unique**; values can repeat.
- **Keys are stored in sorted order** (similar to `set`).
- Key and value can be of **any data type**, including pairs.

### Declaration and insertion

```cpp
map<int, int> mp;

mp[1] = 2;                 // key 1 -> value 2
mp.emplace(3, 1);          // key 3 -> value 1
mp.insert({2, 4});         // key 2 -> value 4

// map now internally stores (sorted by key): {1,2}, {2,4}, {3,1}
```

### Map with a pair as key

```cpp
map<pair<int,int>, int> mp;
mp[{2, 3}] = 10;    // key (2,3) -> value 10
```

### Iterating over a map

```cpp
for (auto it : mp) {
    cout << it.first << " " << it.second << endl;
}
```

- Iterates in **sorted order of keys**.

### Accessing elements

```cpp
cout << mp[1];   // value at key 1 (e.g. 2)
cout << mp[5];   // key 5 doesn't exist -> prints 0 / null (default value)
```

### `find`

```cpp
auto it = mp.find(3);       // returns iterator pointing to the (3, 1) pair
cout << (*it).second;        // access the value -> 1

auto it2 = mp.find(5);      // key doesn't exist -> returns mp.end()
```

- `lower_bound` / `upper_bound` also work on maps (same behavior/logic as the linked video on sorted arrays).
- Other functions (`erase`, `swap`, `size`, `empty`) work as in `vector`/`set`.

---

## 22. Multimap

- Same as `map`, but allows **duplicate keys**.

```cpp
multimap<int, int> mmp;
mmp.insert({1, 2});
mmp.insert({1, 3});   // duplicate key 1 - allowed
```

- Still maintains **sorted order of keys**.

---

## 23. Unordered Map

- Same as `map` (unique keys), but does **NOT maintain sorted order**.

```cpp
unordered_map<int, int> ump;
ump[1] = 5;
ump[2] = 10;
```

- `map` operations run in **O(log n)**; `unordered_map` operations run in (almost always) **O(1)**, with rare worst-case **O(n)**.

---

## 24. Sorting Algorithm (STL `sort`)

### Basic ascending sort

```cpp
int a[] = {1, 5, 3, 2};
sort(a, a + 4);     // sorts entire array: a is the start iterator, a+4 is "one past the end"
// a becomes {1, 2, 3, 5}
```

- No need to manually implement bubble sort / selection sort / merge sort — `sort()` handles it.
- For vectors:

```cpp
vector<int> v = {1, 5, 3, 2};
sort(v.begin(), v.end());
```

### Sorting a portion of an array/vector

```cpp
int a[] = {1, 3, 5, 2};
sort(a + 2, a + 4);   // only sorts indices 2 and 3
```

### Sorting in descending order

```cpp
int a[] = {1, 3, 5, 2};
sort(a, a + 4, greater<int>());
// a becomes {5, 3, 2, 1}
```

- `greater<int>()` is a built-in comparator.

### Custom sort with your own comparator

**Problem type:** sort an array of pairs — primarily by second element (ascending); if second elements are equal, sort by first element (descending).

```cpp
bool comparator(pair<int,int> p1, pair<int,int> p2) {
    if (p1.second < p2.second) {
        return true;    // p1 correctly comes before p2
    } else if (p1.second > p2.second) {
        return false;   // p1 should NOT come before p2 (needs swap)
    } else {
        // second elements equal -> break tie via first element, DESCENDING
        if (p1.first > p2.first) {
            return true;
        }
        return false;
    }
}

int main() {
    pair<int,int> arr[] = {{1,2}, {2,1}, {4,1}};
    sort(arr, arr + 3, comparator);
    // Result order: (4,1), (2,1), (1,2)
    return 0;
}
```

**How to think about writing a comparator (Striver's method):**

- Always reason about just **two elements at a time**: `p1` and `p2`.
- Ask: "should `p1` come before `p2`?" → if yes, `return true`; if no, `return false`.
- The comparator function must return a `bool`.
- Never think in terms of the whole array — just compare two items following your sorting rule.

---

## 25. `__builtin_popcount`

Counts the number of **set bits (1's)** in the binary representation of a number.

```cpp
int n = 7;               // binary: 111
cout << __builtin_popcount(n);   // 3

int m = 6;                // binary: 110
cout << __builtin_popcount(m);   // 2
```

- For `long long` values, use the `ll` suffix version:

```cpp
long long n = 7;
cout << __builtin_popcountll(n);
```

---

## 26. `next_permutation`

Generates the **next lexicographically greater permutation** of a sequence.

```cpp
string s = "123";
sort(s.begin(), s.end());   // IMPORTANT: must start from the sorted (smallest) permutation

do {
    cout << s << endl;
} while (next_permutation(s.begin(), s.end()));
```

**Trace for "123":**

```
123
132
213
231
312
321
```

- `next_permutation` returns `false` once there are no more permutations left (i.e., you've reached the largest/lexicographically last permutation) — this breaks the `while` loop.
- **Critical rule:** To print **all** permutations, you must start from the **sorted** (smallest) version of the sequence. If you start from, say, `"231"`, `next_permutation` will only generate permutations _after_ that point (`312`, `321`) — it won't loop back to print the ones before it.

---

## 27. `max_element` / `min_element`

```cpp
int a[] = {1, 7, 5, 6};

auto it = max_element(a, a + 4);   // returns an ITERATOR (address) pointing to the max element
cout << *it;                         // dereference to get the actual max VALUE -> 7

auto itMin = min_element(a, a + 4);
cout << *itMin;                      // minimum value
```

- Also works on vectors: `max_element(v.begin(), v.end())`.

---

## Quick Reference — When to Use What (Use-Case Cheat Sheet)

|Container/Concept|Use When...|
|---|---|
|`array`|Fixed number of same-type elements known in advance|
|`vector`|Need a dynamic/resizable array; general-purpose sequential storage|
|`list`|Need frequent insert/delete at the **front** as well as back|
|`deque`|Need fast operations at **both** front and back|
|`stack`|Need LIFO behavior (e.g., undo operations, balanced parentheses, DFS)|
|`queue`|Need FIFO behavior (e.g., BFS, task scheduling)|
|`priority_queue`|Need quick access to the max (or min, with `greater<>`) element repeatedly|
|`set`|Need unique elements maintained in sorted order, with fast search|
|`multiset`|Like `set`, but duplicates need to be preserved|
|`unordered_set`|Need unique elements + fast O(1) lookup, don't care about order|
|`map`|Need key-value lookup with unique, sorted keys|
|`multimap`|Like `map`, but duplicate keys allowed|
|`unordered_map`|Need key-value lookup with O(1) average access, don't care about order|
|`pair`|Need to bundle 2 (or more, via nesting) values together|
|`sort()`|Need to sort array/vector — ascending, descending, or by custom rule|
|`next_permutation`|Need to generate all permutations of a sequence|
|`__builtin_popcount`|Need to count set bits (binary 1's) in a number|
|Pass by reference (`&`)|Function needs to modify the original variable/container|
|Pass by value (default)|Function should NOT affect the original — safe, isolated copy|

---

## Practice Questions (Implementation)

> **How to use this section:** Try to write the actual code yourself (on paper, in your head, or in an IDE) _before_ scrolling back up to check the notes. Some questions are "predict the output" (great for testing whether you really understand a concept), others are "write a program from scratch." No answers are given on purpose — that's the whole point of active recall. If you want, come back and paste your solutions and I'll review/debug them with you.

### Section 1–2: Skeleton, I/O

1. Write a program that takes your name and age as input (on two separate lines) and prints `"<name> is <age> years old"`.
2. Predict the output without running it:
    
    ```cpp
    int a, b;cin >> a >> b;cout << a << b << endl;cout << a << " " << b;
    ```
    
    (Input given: `5 10`) — what exactly gets printed, and why does the first line look "joined"?
3. Write a program that takes 3 integers on the **same line** and prints their sum, without using an array.

### Section 3: Data Types

4. What will this print, and why? (Think about truncation.)
    
    ```cpp
    int x = 9.99;cout << x;
    ```
    
5. Write a program that takes a `float` price and an `int` quantity, and prints the total cost.
6. Take a full sentence as input (with spaces) and print it back. Which input method must you use, and why would the "obvious" one fail?
7. Declare a `char` and try assigning it a string like `"AB"` (in your head, don't run it) — what do you expect to happen, and why?

### Section 4: If-Else

8. Write a program to check if a number is positive, negative, or zero.
9. Write a program that takes a year and prints whether it's a leap year (leap year rule: divisible by 4, but if divisible by 100 it must also be divisible by 400).
10. Rewrite the grading program from the notes but for this scheme, and try to **trim unnecessary conditions** like Striver did:
    - `< 30` → F
    - `30–44` → E
    - `45–59` → D
    - `60–74` → C
    - `75–89` → B
    - `>= 90` → A
11. Write a **nested if-else** program: given a person's age and whether they have a valid ID (`true`/`false` as `1`/`0` input), decide:
    - age < 18 → "Not allowed"
    - age >= 18 and has ID → "Allowed"
    - age >= 18 and no ID → "Allowed, but bring ID next time"

### Section 5: Switch

12. Write a switch-based calculator: take two numbers and an operator character (`+`, `-`, `*`, `/`), and print the result. Don't forget `break`!
13. Predict the output (careful with fall-through):
    
    ```cpp
    int x = 2;switch (x) {    case 1: cout << "A";    case 2: cout << "B";    case 3: cout << "C"; break;    case 4: cout << "D";}
    ```
    
14. Write a switch statement that converts a single-digit number (0–9) into its English word (e.g., `3` → `"Three"`), including a `default` case for invalid input.

### Section 6–7: Arrays & Strings

15. Write a program to find the **largest element** in a 1D array (without using `max_element`).
16. Write a program to **reverse an array in-place** (swap elements without using an extra array).
17. Write a program that takes a 3x3 2D array and prints the sum of its diagonal elements.
18. Write a program to check if a string is a **palindrome** using index-based character access (`s[i]`), not any built-in reverse function.
19. Write a program to count how many vowels are in a given string, looping through it character by character.
20. Predict the output:
    
    ```cpp
    string s = "striver";s[0] = 'S';cout << s;
    ```
    

### Section 8: Loops

21. Print all even numbers from 1 to 50 using a `for` loop.
22. Using a `while` loop, find the sum of digits of a given number (e.g., `1234` → `1+2+3+4 = 10`).
23. Use a `do-while` loop to keep asking the user "Enter a positive number:" until they actually enter one greater than 0.
24. Write nested `for` loops to print this pattern:
    
    ```
    ** ** * ** * * *
    ```
    
25. Trace through this by hand (don't run it) and write down what gets printed:
    
    ```cpp
    for (int i = 5; i >= 1; i -= 2) {    cout << i << " ";}
    ```
    

### Section 9: Functions

26. Write a `void` parameterized function `printTable(int n)` that prints the multiplication table of `n` (1 to 10).
27. Write a return-type function `int factorial(int n)` and use it in `main()` to print `5!`.
28. Write a function `bool isPrime(int n)` and use a loop in `main()` to print all primes between 1 and 50.
29. **Pass by value vs reference challenge:** Write a function `void doubleIt(int x)` (pass by value) and another `void doubleItRef(int &x)` (pass by reference), both of which multiply the input by 2. Call both from `main()` on the same variable and predict what the variable's value will be after each call.
30. Write a function that takes an **array** and its size, and reverses it in place (remember: arrays are always passed by reference — no `&` needed).
31. Trickier: Write a function `void modifyString(string &s)` that removes all spaces from a string, then call it from `main()` and confirm the original string changed.

### Section 11: Pairs

32. Create an array of 5 `pair<string, int>` representing (name, marks) of students. Print each pair.
33. Write a `pair<int,int>` that stores nested data representing (x, y, z) coordinates using the nested-pair trick from the notes, and access `z`.

### Section 12: Vectors

34. Take `n` as input, then take `n` integers into a `vector<int>`, and print their sum and average.
35. Write a program to remove all even numbers from a vector using `erase` inside a loop. (Hint: think carefully about what happens to the iterator after an erase — this is a classic gotcha!)
36. Given `vector<int> v = {5, 3, 8, 1, 9};`, use iterators (not index-based access) to print the vector in reverse.
37. Insert the value `0` at the very beginning of a vector, and `100` right before the last element — using `insert()`.

### Section 13–14: List & Deque

38. Use a `deque<int>` to simulate a sliding window: push values at the back, and whenever the deque's size exceeds 3, pop from the front. Print the deque's contents after each step.

### Section 15–16: Stack & Queue

39. Write a program using `stack<char>` to check if a string of brackets like `"({[]})"` is **balanced** (equal, correctly nested opening/closing brackets).
40. Use a `queue<int>` to simulate a simple ticket counter: push 5 ticket numbers, then pop and print them one by one in the order they'd be served.
41. Predict output:
    
    ```cpp
    stack<int> st;st.push(1); st.push(2); st.push(3);st.pop();cout << st.top();
    ```
    

### Section 17: Priority Queue

42. Given a list of exam scores, use a **max-heap** priority_queue to print the top 3 highest scores.
43. Use a **min-heap** (`priority_queue<int, vector<int>, greater<int>>`) to repeatedly pop and print elements — verify they come out in ascending order.

### Section 18–20: Set, Multiset, Unordered Set

44. Take `n` integers as input (with possible duplicates) into a `set<int>`, and print how many **unique** values there are.
45. Use `find()` and `count()` on a `set<int>` to check whether specific values exist — write a small "does X exist?" checker.
46. Given a `multiset<int>` with repeated elements, remove only ONE occurrence of a specific value (not all of them) — this directly tests the erase-by-iterator trick from the notes.
47. When would you pick `unordered_set` over `set`? Write one line justifying your choice for a problem where you just need to check "have I seen this number before?" as fast as possible.

### Section 21–23: Map, Multimap, Unordered Map

48. Write a program to count the **frequency of each character** in a string using `map<char, int>`, then print each character with its count.
49. Using a `map<string, int>`, build a simple phonebook: insert a few (name, number) pairs, then look up a name and print "not found" if it doesn't exist (careful — accessing a missing key with `mp[key]` actually _inserts_ it! Think about why `find()` is safer here).
50. Explain (in your own words, no code) why you'd choose `unordered_map` over `map` for a word-frequency counter on a huge text file, and when you'd still prefer `map` instead.

### Section 24: Sorting & Comparators

51. Sort a `vector<int>` in descending order using `greater<int>()`.
52. Given a `vector<pair<string,int>>` of (name, age), write a custom comparator to sort by **age ascending**; if ages are equal, sort by **name alphabetically**.
53. Sort only the middle 3 elements of a 6-element array, leaving the first and last elements untouched.

### Section 25–27: Bit tricks, Permutations, Max/Min element

54. Write a program that reads a number and prints how many bits are set (`1`s) in it, using `__builtin_popcount`.
55. Print all permutations of the string `"AB C"` — wait, trick question: think about why you should sort the string _before_ calling `next_permutation`, and what would happen if you forgot.
56. Given an array, find both the **maximum and minimum** in a single pass using `max_element` and `min_element`, then compute the difference.

### Mixed / Challenge Problems (combine multiple concepts)

57. Take `n` integers into a `vector<int>`. Use a `map<int,int>` to count frequency of each number, then use a `priority_queue` to print the **top 3 most frequent** numbers.
58. Write a function `bool isAnagram(string a, string b)` using `sort()` on both strings and comparing them.
59. Simulate a simple **undo feature** using a `stack<string>`: push a sequence of "actions" (strings) as they happen, then let the user "undo" (pop and print) a few times.
60. Build a small **student database**: `map<int, pair<string,int>>` mapping roll number → (name, marks). Take `n` records as input, then let the user query a roll number and print the student's details (handle the "not found" case using `find()`).

---

1. **Don't dig too deep initially** — learn the basics of a tool/concept first, use it, and go deeper only as needed later. Over-researching early slows down progress.
2. **Master one language** first (C++, Java, Python, or JS) — don't switch back and forth.
3. Data types covered (`int`, `long`, `long long`, `float`, `double`, `string`, `char`) are sufficient for the vast majority of DSA problems.
4. STL functions/containers exist so you don't have to reimplement common algorithms (sorting, searching, data structures) from scratch — use them.
5. Time complexities to remember as a baseline:
    - `stack`, `queue`: O(1) for push/pop/top/front/back
    - `set`, `map`, `multiset`, `multimap`: O(log n) for insert/erase/find
    - `unordered_set`, `unordered_map`: O(1) average, O(n) worst case (rare)
    - `priority_queue`: O(log n) push/pop, O(1) top-