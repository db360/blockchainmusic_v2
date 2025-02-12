export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    profile_picture?: string;
    bio?: string;
    role: string;
}

export interface Song {
    id: number;
    album_id: number;
    user_id: number;
    title: string;
    url: string;
    duration: string;
    price: number;
    track_number: number;
    lyrics?: string | null;
    genre: string;
    subgenre?: string | null;
    album?: Album;
    pivot?: {
      playlist_id: string;
      song_id: number;
      created_at: string;
      updated_at: string;
    };
    metadata?: Record<string, any> | null;
    play_count: number;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    song_signed_url: string;
}

export type Songs = Song[];

export interface Album {
    id: number; // Identificador del álbum
    user_id: number; // ID del usuario (artista) que creó el álbum
    title: string; // Título del álbum
    slug: string; // Slug único del álbum
    cover_image?: string | null; // URL de la imagen de portada, puede ser null
    description?: string | null; // Descripción del álbum, puede ser null
    release_date: string; // Fecha de lanzamiento del álbum (usar string o Date)
    price: number; // Precio del álbum
    genre: string; // Género del álbum
    subgenre?: string | null; // Subgénero del álbum, puede ser null
    is_published: boolean; // Estado de publicación del álbum
    metadata?: Record<string, any> | null; // Metadatos adicionales en formato JSON, puede ser null
    created_at: string; // Fecha de creación
    updated_at: string; // Fecha de última actualización

    // Relaciones
    user: User; // Relación con el modelo User
    songs: Song[]; // Lista de canciones del álbum
    purchases: Purchase[]; // Lista de compras del álbum
    favorites: Favorite[]; // Lista de favoritos del álbum

    // Atributos calculados
    totalDuration?: string; // Duración total del álbum, puede ser undefined si no se calcula
}

export interface Playlist {
    cover_image: string;
    created_at: string;
    description?: string;
    id: string;
    is_public: boolean;
    slug: string;
    songs: Song[],
    title: string;
    updated_at: string;
    user_id: number;
}


export interface Like {
  id: number,
  user_id: number,
  favoritable_type: string,
  favoritable_id: number,
  created_at: string,
  updated_at: string,
};


export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    albums?: Albums
    purchaseDetail?: PurchaseWithItems;
};



// export interface Sale {
//     id: string;
//     user_id: number;
//     purchaseable_type: string;
//     amount: string;
//     created_at: string;
//     metadata: null;
//     payment_method: string;
//     status: 'completed' | 'failed' | 'pending';
//     transaction_id: string;
//     updated_at: string;
//     purchaseable: {
//       id: number;
//       album_id: number;
//       user_id: number;
//       created_at: string;
//       deleted_at: null;
//       duration: string;
//       file_url: string;
//       genre: string;
//       lyrics: null;
//       metadata: null;
//       play_count: number;
//       price: string;
//       subgenre: string;
//       title: string;
//       track_number: number;
//       updated_at: string;
//       album: {
//         id: number;
//         user_id: number;
//         title: string;
//         cover_image: string;
//         created_at: string;
//         deleted_at: null;
//         description: string;
//         genre: string;
//         is_published: boolean;
//         metadata: null;
//         price: string;
//         release_date: string;
//         slug: string;
//         subgenre: string;
//         updated_at: string;

//       };
//       user: {
//         id: number;
//         name: string;
//         email: string;
//       };
//     };
//   }


  export interface Purchaseable {
    id: number;
    user_id: number;
    title: string;
    cover_image?: string | null;
    description?: string | null;
    release_date: string;
    price: number;
    genre: string;
    subgenre?: string | null;
    is_published: boolean;
    metadata?: Record<string, any> | null;
    created_at: string;
    updated_at: string;

    user: User;
}

export interface Purchase {
    id: string; // Identificador único de la compra
    user_id: number; // ID del usuario que realiza la compra
    transaction_id: string; // ID único de la transacción
    payment_method: string; // Método de pago utilizado
    status: "completed" | "failed" | "pending"; // Estado de la compra (pending, completed, etc.)
    total: string; // Total de la compra
    metadata?: string | null; // Información adicional en formato JSON
    created_at: string;
    updated_at: string;

    // Relación con otros modelos
    user?: User;
}

export interface PurchaseDetailAlbum {
    id: string; // ID único del detalle de compra
    purchase_id: string; // Relación con la tabla de compras
    purchaseable_id: number; // ID del elemento comprado (álbum o canción)
    purchaseable_type: 'App\\Models\\Album' | 'App\\Models\\Song'; // Tipo del elemento comprado
    item_price: string; // Precio del elemento en el momento de la compra
    created_at: string;
    updated_at: string;

    // Relaciones
    purchase: Purchase; // Información de la compra principal
    purchaseable: Album; // Puede ser un álbum o una canción
}
export interface PurchaseDetailSong {
    id: string; // ID único del detalle de compra
    purchase_id: string; // Relación con la tabla de compras
    purchaseable_id: number; // ID del elemento comprado (álbum o canción)
    purchaseable_type: 'App\\Models\\Album' | 'App\\Models\\Song'; // Tipo del elemento comprado
    item_price: string; // Precio del elemento en el momento de la compra
    created_at: string;
    updated_at: string;

    // Relaciones
    purchase: Purchase; // Información de la compra principal
    purchaseable: Song; // Puede ser un álbum o una canción
}


export interface PurchaseWithItems extends Purchase {
    items: (PurchaseDetailAlbum | PurchaseDetailSong)[];
  }