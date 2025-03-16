# Angular Workshop: Clash Service and Clash Card Component

In this task, you'll integrate a **clash system** into the application by introducing the `ClashCardComponent`, a `ClashService`, and a `clash.ts` file to define the necessary interfaces. Additionally, you'll modify the `AppComponent` to manage and display multiple clashes dynamically.

---

### **1. Generate Required Files Using Angular CLI**

Run the following commands to generate the necessary files:

- Create the **interfaces file**:
  ```sh
  ng generate interface clash
  ```
- Create the **service to manage clashes**:
  ```sh
  ng generate service clash
  ```
- Create the **component to display a clash**:
  ```sh
  ng generate component clash-card
  ```

---

### **2. Define the Clash Model (`clash.ts`)**

Ensure the `clash.ts` file includes:

```ts
export interface Peer {
  id: number;
  name: string;
  gender: string;
  city: string;
  country: string;
  pictureUrl: string;
}

export interface Clash {
  id: number;
  createdByPeer: Peer;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  participants: Peer[];
  pictureUrl: string;
}
```

---

### **3. Implement `ClashService`**

Add a `findAll(): Observable<Clash[]>` method.

For now, you can return the dummy data:

```ts
  {
        id: 2,
        createdByPeer: {
          id: 17,
          name: 'Daniel Clark',
          gender: 'Male',
          city: 'Barcelona',
          country: 'Spain',
          pictureUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
        },
        title: 'Lunch at The Grill',
        description: "Let's grab some lunch and talk about tech innovations",
        date: '2023-02-10',
        time: '12:30',
        location: 'The Grill',
        address: 'Oxford Street, London',
        participants: [
          {
            id: 18,
            name: 'Isabella Harris',
            gender: 'Female',
            city: 'Sydney',
            country: 'Australia',
            pictureUrl: 'https://randomuser.me/api/portraits/women/9.jpg',
          },
        ],
        pictureUrl:
          'https://image.lexica.art/full_webp/073ec0b1-b9fd-47bb-a3d2-c3c1c0cc6923',
      },
    ]);
  }
```

You can use [of](https://rxjs.dev/api/index/function/of) to create an Observable.

---

### **4. Implement the `ClashCardComponent`**

Modify the generated `ClashCardComponent` to:

- Accept a **clash** as an input.
- Display the **clash image** and **title**.
- Show a **list of participants** using `@for` (preferable over `*ngFor` for performance). You might want to create a `participants = computed(() => /* ...*/)` property.
- Use the `app-profile-picture` component to render participant avatars with a fixed `diameter` of `32px`.

Example template:

```html
<div class="border-2 border-gray-200 rounded-lg p-2 flex gap-2 flex-col shadow max-w-64 max-h-72" *ngIf="clash() as clash">
  <img [src]="clash.pictureUrl" [alt]="clash.title" class="object-cover max-h-48 w-full" />
  <h2 class="border-b-2 w-full">{{ clash.title }}</h2>
  <div class="flex flex-row gap-2 mb-2">
    @for (peer of participants(); track peer.id) {
    <app-profile-picture [diameter]="32" [profileUrl]="peer.pictureUrl"></app-profile-picture>
    }
  </div>
</div>
```

---

### **5. Modify `AppComponent` to Handle Clashes Dynamically**

If you like, remove all `ProfilePictureComponent` references in the `AppComponent` as we won't use it here any more.

Enhance `AppComponent` to:

- inject the `ClashService`

```ts
clashService = inject(ClashService);
```

- convert the `Observable` to a `Signal` (although this is not required)

```ts
import { toSignal } from "@angular/core/rxjs-interop";
```

```ts
clashes = toSignal(this.clashService.findAll());
```

Add the following code to `app.component.html`:

```html
<div class="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
  @for (clash of clashes(); track clash.id) {
  <app-clash-card [clash]="clash"></app-clash-card>
  }
</div>
```
