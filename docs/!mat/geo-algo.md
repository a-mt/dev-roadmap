---
title: Algorithmes
category: Maths, Géométrie
---

## Distance entre deux emplacements: formule d'Harvesine

* Trouver l'objet se trouvant au plus près de la position de l'utilisateur en fonction des latitudes et longitudes

  ``` python
  # Lon/lat User
  longitude_a = 3.833542
  latitude_a = 43.634646

  # Lon/lat Object
  longitude_b = 3.87952263361082
  latitude_b = 43.6071285339217

  # Compute distance
  x = (longitude_b - longitude_a) * math.cos(
      (latitude_b + latitude_a) / 2
  )
  y = (latitude_b - latitude_a)
  d = math.sqrt(x**2 + y**2) * 6371

  print(d)
  # 6.6839095491976535
  ```

  Dans cette formule, les latitudes et longitudes sont exprimées en radians. 6371 correspond au rayon de la terre en km.
