```mermaid
classDiagram
    class user {
        +String _id
        +String email
        +String password
        +List<String> interests
        +boolean completeProfile
        +int distance
        +String gender
        +String genderInterested
        +String image
        +limit limit
        +String university
        +String username
    }
    class limit {
        +int count
        +String _id
        +String _id
        +String date
    }
    user -- limit
```
