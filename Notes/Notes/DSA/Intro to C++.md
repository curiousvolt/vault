# Introduction to C++

A complete, practical C++ reference for DSA, programming fundamentals, and problem solving.

---

## 1. What is C++?

C++ is a compiled, statically typed, general-purpose language supporting procedural, object-oriented, generic, and low-level programming.

### Why C++ for DSA?

- Fast execution
- Strong Standard Template Library (STL)
- Rich built-in containers and algorithms
- Good control over memory
- Widely used in competitive programming and systems programming

### First program

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!\n";
    return 0;
}
```

`#include` imports a header, `main()` is the entry point, `std::cout` prints output, and `return 0` indicates successful execution.

> `\n` is the newline escape sequence. `'/n'` is incorrect.

---

## 2. Compilation

C++ source files normally use `.cpp`.

With GCC:

```bash
g++ main.cpp -std=c++17 -o main
./main
```

Common standards are C++11, C++14, C++17, C++20, and C++23. C++17 is a useful baseline for DSA unless a problem specifies otherwise.

---

## 3. Comments

```cpp
// Single-line comment

/* Multi-line
   comment */
```

---

## 4. Variables and Data Types

```cpp
int age = 20;
double price = 99.5;
char grade = 'A';
bool passed = true;
std::string name = "Aman";
```

Common types:

| Type | Use |
|---|---|
| `int` | Normal integers |
| `long long` | Large integers |
| `float` | Single-precision decimals |
| `double` | Double-precision decimals |
| `char` | One character |
| `bool` | `true` / `false` |
| `string` | Text |

Use `long long` when a calculation can exceed `int` range:

```cpp
long long x = 10000000000LL;
```

### Constants

```cpp
const double PI = 3.141592653589793;
```

---

## 5. Input and Output

```cpp
int a;
std::cin >> a;
std::cout << a << '\n';
```

Multiple values:

```cpp
int a, b;
std::cin >> a >> b;
std::cout << a + b << '\n';
```

### Fast I/O

```cpp
std::ios::sync_with_stdio(false);
std::cin.tie(nullptr);
```

### Read a whole line

```cpp
std::string s;
std::getline(std::cin, s);
```

After formatted input, a leftover newline may need to be consumed before `getline`.

---

## 6. Operators

### Arithmetic

`+  -  *  /  %`

```cpp
int a = 7, b = 3;
std::cout << a / b; // 2
std::cout << a % b; // 1
```

Integer division discards the fractional part.

### Relational

`==  !=  <  >  <=  >=`

### Logical

`&&` AND, `||` OR, `!` NOT

### Assignment

`=  +=  -=  *=  /=  %=`

### Increment/decrement

`++x`, `x++`, `--x`, `x--`

Prefix changes first; postfix uses the previous value for the expression.

### Ternary

```cpp
int mx = (a > b) ? a : b;
```

---

## 7. Type Conversion

Implicit:

```cpp
int x = 5;
double y = x;
```

Explicit:

```cpp
double x = 7.9;
int y = static_cast<int>(x); // 7
```

Prefer C++ named casts such as `static_cast` over old C-style casts when appropriate.

---

## 8. Conditions

```cpp
if (marks >= 90) {
    std::cout << "A";
} else if (marks >= 60) {
    std::cout << "B";
} else {
    std::cout << "C";
}
```

### Switch

```cpp
switch (choice) {
    case 1:
        std::cout << "One";
        break;
    case 2:
        std::cout << "Two";
        break;
    default:
        std::cout << "Other";
}
```

Without `break`, execution can fall through to the next case.

---

## 9. Loops

### `for`

```cpp
for (int i = 0; i < 5; i++) {
    std::cout << i << ' ';
}
```

### `while`

```cpp
while (condition) {
    // work
}
```

### `do-while`

```cpp
do {
    // runs at least once
} while (condition);
```

### Range-based loop

```cpp
for (int x : v) {
    std::cout << x << ' ';
}
```

Modify elements with a reference:

```cpp
for (int &x : v) x *= 2;
```

Avoid copying large objects:

```cpp
for (const auto &x : v) std::cout << x << ' ';
```

---

## 10. Functions

```cpp
int add(int a, int b) {
    return a + b;
}
```

### Pass by value

A copy is passed:

```cpp
void f(int x) { x++; }
```

### Pass by reference

The original can be modified:

```cpp
void f(int &x) { x++; }
```

### Const reference

Avoids copying while preventing modification:

```cpp
void print(const std::string &s) {
    std::cout << s;
}
```

### Overloading

Functions may have the same name when their parameter lists differ.

```cpp
int area(int s);
double area(double r);
```

---

## 11. Scope

```cpp
int global = 10;

int main() {
    int local = 20;
}
```

Local variables are visible only in their scope. Prefer local state over globals unless global state is intentional.

---

## 12. Arrays

```cpp
int a[5] = {1, 2, 3, 4, 5};
```

Indexes start at `0`.

For `n` elements, valid indexes are `0` through `n - 1`.

### 2D array

```cpp
int matrix[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};
```

---

## 13. Strings

```cpp
#include <string>
std::string s = "hello";
```

Useful operations:

```cpp
s.size();
s.empty();
s[0];
s.push_back('!');
s.pop_back();
s.substr(1, 3);
```

C++ strings support comparison using `==`, `<`, `>`, etc.

A C-style string is a null-terminated character array:

```cpp
char s[] = "hello";
```

Prefer `std::string` for normal C++ code.

---

## 14. Pointers

A pointer stores an address.

```cpp
int x = 10;
int *p = &x;

std::cout << *p; // 10
```

- `&x` = address of `x`
- `p` = stored address
- `*p` = value at the address

```cpp
*p = 20;
```

Now `x` is `20`.

### Null pointer

```cpp
int *p = nullptr;
```

Never dereference an invalid or null pointer.

---

## 15. References

A reference is an alias for an existing object.

```cpp
int x = 10;
int &r = x;
r = 20;
```

Now `x == 20`.

References are useful for modifying original objects and avoiding unnecessary copies.

---

## 16. Dynamic Memory

Manual allocation:

```cpp
int *p = new int(5);
delete p;
```

Array allocation:

```cpp
int *a = new int[n];
delete[] a;
```

Modern C++ generally prefers RAII containers and smart pointers over manual `new`/`delete`.

---

# STL — Standard Template Library

## 17. `vector`

The most important general-purpose DSA container.

```cpp
#include <vector>
std::vector<int> v;
v.push_back(10);
v.push_back(20);
```

Initialization:

```cpp
std::vector<int> a = {1, 2, 3};
std::vector<int> b(5);       // five zeros
std::vector<int> c(5, 7);    // five sevens
```

Useful operations:

```cpp
v.size();
v.empty();
v.front();
v.back();
v.push_back(x);
v.pop_back();
v.clear();
v.resize(n);
```

Access:

```cpp
v[i];        // no bounds checking
v.at(i);     // bounds checked
```

Complexity:

| Operation | Complexity |
|---|---:|
| Random access | O(1) |
| `push_back` | Amortized O(1) |
| Middle insertion/erase | O(n) |
| Linear search | O(n) |

---

## 18. Iterators

```cpp
for (auto it = v.begin(); it != v.end(); ++it) {
    std::cout << *it << ' ';
}
```

`begin()` points to the first element; `end()` points one past the last element.

Reverse iteration:

```cpp
for (auto it = v.rbegin(); it != v.rend(); ++it)
    std::cout << *it << ' ';
```

---

## 19. `pair`

```cpp
std::pair<int, std::string> p = {1, "Aman"};
std::cout << p.first << ' ' << p.second;
```

Useful for storing two related values and for graph/DSA representations.

---

## 20. `stack`

LIFO: Last In, First Out.

```cpp
std::stack<int> st;
st.push(10);
st.push(20);
st.top();
st.pop();
st.empty();
```

Typical push/pop/top: O(1).

---

## 21. `queue`

FIFO: First In, First Out.

```cpp
std::queue<int> q;
q.push(10);
q.push(20);
q.front();
q.pop();
```

Typical push/pop/front: O(1).

---

## 22. `deque`

Double-ended queue:

```cpp
std::deque<int> d;
d.push_front(1);
d.push_back(2);
d.pop_front();
d.pop_back();
```

---

## 23. `priority_queue`

Max-heap by default:

```cpp
std::priority_queue<int> pq;
pq.push(5);
pq.push(10);
std::cout << pq.top(); // 10
```

Min-heap:

```cpp
std::priority_queue<int, std::vector<int>, std::greater<int>> pq;
```

Typical push/pop: O(log n), top: O(1).

---

## 24. `set` and `multiset`

`set` stores unique values in sorted order:

```cpp
std::set<int> s;
s.insert(5);
s.insert(2);
s.insert(5); // ignored
```

Useful operations:

```cpp
s.find(x);
s.count(x);
s.erase(x);
s.lower_bound(x);
s.upper_bound(x);
```

`multiset` allows duplicates.

Typical search/insert/erase: O(log n).

---

## 25. `map`

Stores key-value pairs ordered by key.

```cpp
std::map<std::string, int> freq;
freq["apple"]++;
```

Typical insert/find/erase: O(log n).

---

## 26. `unordered_map`

Hash-table based key-value storage. Keys are not sorted.

```cpp
std::unordered_map<std::string, int> freq;
freq["apple"]++;
```

Average insert/find/erase: O(1). Worst case: O(n).

### Frequency counting pattern

```cpp
std::unordered_map<int, int> freq;
for (int x : v) {
    freq[x]++;
}
```

---

# STL Algorithms

## 27. Sorting

```cpp
std::sort(v.begin(), v.end());
```

Descending:

```cpp
std::sort(v.begin(), v.end(), std::greater<int>());
```

Custom comparator:

```cpp
std::sort(v.begin(), v.end(), [](int a, int b) {
    return a > b;
});
```

Typical complexity: O(n log n).

---

## 28. Searching

Linear search:

```cpp
auto it = std::find(v.begin(), v.end(), x);
```

Binary search requires sorted data:

```cpp
bool found = std::binary_search(v.begin(), v.end(), x);
```

Complexity: O(log n) for random-access sorted ranges.

---

## 29. `lower_bound` and `upper_bound`

For a sorted range:

```cpp
auto lb = std::lower_bound(v.begin(), v.end(), x);
auto ub = std::upper_bound(v.begin(), v.end(), x);
```

- `lower_bound(x)` = first position with value `>= x`
- `upper_bound(x)` = first position with value `> x`

Number of occurrences of `x`:

```cpp
int count = ub - lb;
```

---

## 30. Other Important Algorithms

```cpp
std::reverse(v.begin(), v.end());
std::count(v.begin(), v.end(), x);
*std::min_element(v.begin(), v.end());
*std::max_element(v.begin(), v.end());
```

Sum:

```cpp
#include <numeric>
long long sum = std::accumulate(v.begin(), v.end(), 0LL);
```

---

## 31. Lambda Functions

Anonymous functions:

```cpp
auto square = [](int x) {
    return x * x;
};
```

Common with sorting:

```cpp
std::sort(v.begin(), v.end(), [](const auto &a, const auto &b) {
    return a.second < b.second;
});
```

Capture by value:

```cpp
int k = 5;
auto f = [k](int x) { return x + k; };
```

Capture by reference:

```cpp
auto f = [&](int x) { return x + k; };
```

---

# Object-Oriented C++

## 32. `struct`

```cpp
struct Student {
    std::string name;
    int age;
};

Student s{"Aman", 20};
```

Struct members are public by default.

---

## 33. Classes

```cpp
class Student {
private:
    int age;

public:
    Student(int a) : age(a) {}

    int getAge() const {
        return age;
    }
};
```

Create an object:

```cpp
Student s(20);
```

Classes are useful for linked lists, trees, graphs, and custom data structures.

### Access modifiers

- `public` — accessible from outside
- `private` — accessible only inside the class
- `protected` — accessible inside the class and derived classes

Class members are private by default; struct members are public by default.

---

## 34. Constructors and Destructors

Constructor initializes an object:

```cpp
class A {
public:
    A() {
        std::cout << "Created";
    }
};
```

Destructor runs when the object is destroyed:

```cpp
~A() {
    std::cout << "Destroyed";
}
```

Prefer constructor initialization lists:

```cpp
A(int x) : value(x) {}
```

---

## 35. OOP Principles

1. **Encapsulation** — combine data and behavior while controlling access.
2. **Abstraction** — hide unnecessary implementation details.
3. **Inheritance** — derive a class from another class.
4. **Polymorphism** — one interface can represent multiple implementations.

---

## 36. Inheritance

```cpp
class Animal {
public:
    void eat() { std::cout << "Eating"; }
};

class Dog : public Animal {
public:
    void bark() { std::cout << "Bark"; }
};
```

---

## 37. Virtual Functions

```cpp
class Base {
public:
    virtual void show() {
        std::cout << "Base";
    }
    virtual ~Base() = default;
};

class Derived : public Base {
public:
    void show() override {
        std::cout << "Derived";
    }
};
```

`virtual` enables runtime polymorphism. A virtual destructor is important when deleting derived objects through base pointers.

---

# Memory and Modern C++

## 38. Stack vs Heap

**Stack:** automatic local variables and function-call data; generally fast and automatically managed.

**Heap:** dynamically allocated storage with a longer/independent lifetime; modern C++ normally manages it through RAII and containers.

---

## 39. `const`

```cpp
const int x = 10;
```

For parameters:

```cpp
void print(const std::vector<int>& v) {
    // cannot modify v
}
```

Use `const` to enforce non-modification and communicate intent.

---

## 40. `auto`

```cpp
auto x = 10;
auto it = v.begin();
```

The compiler infers a static type; `auto` does not make C++ dynamically typed.

---

## 41. Smart Pointers

```cpp
#include <memory>
auto p = std::make_unique<int>(10);
std::cout << *p;
```

Main smart pointers:

- `unique_ptr` — one owner
- `shared_ptr` — shared ownership
- `weak_ptr` — non-owning observer of shared ownership

For most DSA problems, STL containers are preferable to manual dynamic memory.

---

## 42. Move Semantics

C++ can transfer resources instead of copying them:

```cpp
std::string a = "hello";
std::string b = std::move(a);
```

After a move, the source object remains valid but its previous value should not be assumed.

---

## 43. Useful Modern Features

### Structured bindings

```cpp
auto [key, value] = *mp.begin();
```

### `emplace`

Construct directly inside a container:

```cpp
v.emplace_back(10);
mp.emplace("apple", 5);
```

### `constexpr`

```cpp
constexpr int square(int x) {
    return x * x;
}
```

---

# Recursion and DSA Patterns

## 44. Recursion

A recursive function needs a base case and must move toward it.

```cpp
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
```

Every recursive call uses call-stack memory. Deep recursion can overflow the stack.

Use recursion heavily in trees, DFS, backtracking, divide-and-conquer, and some DP formulations.

---

## 45. Two Pointers

Common for sorted arrays and pair/range problems:

```cpp
int l = 0, r = n - 1;
while (l < r) {
    // inspect v[l] and v[r]
}
```

---

## 46. Binary Search Template

```cpp
int l = 0, r = n - 1;
while (l <= r) {
    int mid = l + (r - l) / 2;

    if (v[mid] == target) {
        break;
    } else if (v[mid] < target) {
        l = mid + 1;
    } else {
        r = mid - 1;
    }
}
```

`l + (r-l)/2` is preferred over `(l+r)/2` because it avoids possible integer overflow.

---

## 47. Prefix Sum

```cpp
std::vector<long long> pref(n + 1, 0);
for (int i = 0; i < n; i++) {
    pref[i + 1] = pref[i] + v[i];
}
```

Range sum `[l, r]`:

```cpp
long long sum = pref[r + 1] - pref[l];
```

---

## 48. Useful DSA Complexity Table

| Operation | Complexity |
|---|---:|
| Array/vector access | O(1) |
| `vector.push_back` | Amortized O(1) |
| Linear search | O(n) |
| `sort` | O(n log n) |
| Binary search | O(log n) |
| `set` search/insert | O(log n) |
| `map` search/insert | O(log n) |
| `unordered_map` average search/insert | O(1) |
| Stack push/pop/top | O(1) |
| Queue push/pop/front | O(1) |
| Heap push/pop | O(log n) |
| Heap top | O(1) |

---

# Common Mistakes

## 49. Mistakes to Avoid

### Assignment vs comparison

```cpp
if (x == 5) { }
```

not `if (x = 5)` when you mean comparison.

### Off-by-one errors

For `n` elements, indexes are `0 ... n-1`.

### Integer division

```cpp
5 / 2 == 2
```

Use floating-point arithmetic when a decimal answer is required.

### Overflow

Use an appropriate wider type such as `long long` when required.

### Invalid pointers

Do not dereference null, dangling, or uninitialized pointers.

### Iterator invalidation

Insertion, reallocation, and erasure can invalidate iterators/references depending on the container and operation.

### Undefined behavior

Out-of-bounds access, use-after-free, invalid pointer dereference, and signed integer overflow are examples. Undefined behavior means the C++ standard does not define the result.

---

# File I/O

## 50. Basic File I/O

```cpp
#include <fstream>

std::ofstream out("data.txt");
out << "Hello\n";
out.close();
```

Reading:

```cpp
std::ifstream in("data.txt");
std::string s;
while (std::getline(in, s)) {
    std::cout << s << '\n';
}
```

---

# DSA-Focused C++ Template

## 51. Competitive Programming Template

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // solution

    return 0;
}
```

`bits/stdc++.h` is convenient but non-standard. For portable/general C++, include the individual standard headers you need.

---

# Recommended Learning Order

## 52. Learn C++ for DSA in This Order

1. Program structure and syntax
2. Variables and data types
3. Input/output
4. Operators
5. Conditions
6. Loops
7. Functions
8. Arrays and strings
9. Pointers and references
10. `vector`
11. STL containers
12. Iterators and algorithms
13. Recursion
14. Structs and classes
15. Complexity analysis
16. Linked lists
17. Stacks and queues
18. Trees and heaps
19. Hashing
20. Graphs
21. Sorting and searching
22. Greedy algorithms
23. Dynamic programming

---

# Quick Reference

```cpp
// Input
cin >> x;
getline(cin, s);

// Output
cout << x << '\n';

// Vector
vector<int> v;
v.push_back(x);
v.pop_back();
v.size();

// Sorting
sort(v.begin(), v.end());

// Searching
find(v.begin(), v.end(), x);
binary_search(v.begin(), v.end(), x);

// Bounds
lower_bound(v.begin(), v.end(), x);
upper_bound(v.begin(), v.end(), x);

// Stack
st.push(x);
st.top();
st.pop();

// Queue
q.push(x);
q.front();
q.pop();

// Priority queue
pq.push(x);
pq.top();
pq.pop();

// Set
s.insert(x);
s.find(x);
s.erase(x);

// Map
mp[key]++;
mp.find(key);

// Pair
p.first;
p.second;
```

---

## Key Takeaways

- C++ is compiled and statically typed.
- `main()` is the program entry point.
- Learn the STL early; it is central to practical DSA in C++.
- `vector`, `string`, `pair`, `stack`, `queue`, `priority_queue`, `set`, `map`, and `unordered_map` cover a large portion of common DSA needs.
- Know the complexity of every major operation you use.
- Prefer `const` references when copying is unnecessary.
- Use `long long` when integer values may become large.
- Understand pointers, references, recursion, and object lifetime.
- Use STL algorithms such as `sort`, `find`, `binary_search`, `lower_bound`, `upper_bound`, `reverse`, and `accumulate`.
- Correctness comes first; then optimize time and memory complexity.
