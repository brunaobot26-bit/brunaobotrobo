import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ==================== LOOKUP DATA ====================
const lookupData: any = {"labor_item": {"product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "name": "Mão de Obra", "sku": "10681", "price_including_tax": 99.9, "tag_ids": ["76510b18-468a-4fc8-8159-cef6743b8f9c"], "item_type": "labor"}, "groups": {"tela iphone": ["tela", "display", "frontal"], "bateria iphone": ["bateria"], "traseira de vidro": ["traseira", "traseira de vidro", "vidro traseiro", "back glass"]}, "models": {"iphone se 2ª geração": ["iphone se 2", "iphone se 2020", "se 2", "se 2a geração"], "iphone se 3ª geração": ["iphone se 3", "iphone se 2022", "se 3", "se 3a geração"], "iphone xs max": ["iphone xsmax", "xs max"], "iphone xs": ["iphone xs"], "iphone xr": ["iphone xr"], "iphone x": ["iphone x"], "iphone 11 pro max": ["iphone 11 pro max"], "iphone 11 pro": ["iphone 11 pro"], "iphone 11": ["iphone 11"], "iphone 12 pro max": ["iphone 12 pro max"], "iphone 12 pro": ["iphone 12 pro"], "iphone 12 mini": ["iphone 12 mini"], "iphone 12": ["iphone 12"], "iphone 13 pro max": ["iphone 13 pro max"], "iphone 13 pro": ["iphone 13 pro"], "iphone 13 mini": ["iphone 13 mini"], "iphone 13": ["iphone 13"], "iphone 14 pro max": ["iphone 14 pro max"], "iphone 14 pro": ["iphone 14 pro"], "iphone 14 plus": ["iphone 14 plus"], "iphone 14": ["iphone 14"], "iphone 15 pro max": ["iphone 15 pro max"], "iphone 15 pro": ["iphone 15 pro"], "iphone 15 plus": ["iphone 15 plus"], "iphone 15": ["iphone 15"], "iphone 16 pro max": ["iphone 16 pro max"], "iphone 16 pro": ["iphone 16 pro"], "iphone 16 plus": ["iphone 16 plus"], "iphone 16": ["iphone 16"], "iphone 16e": ["iphone 16e"], "iphone 17 pro max": ["iphone 17 pro max"], "iphone 17 pro": ["iphone 17 pro"], "iphone 17": ["iphone 17"], "iphone air": ["iphone air"], "iphone 8 plus": ["iphone 8 plus"], "iphone 8": ["iphone 8"], "iphone 7 plus": ["iphone 7 plus"], "iphone 7": ["iphone 7"], "iphone 6s plus": ["iphone 6s plus"], "iphone 6s": ["iphone 6s"], "iphone 6 plus": ["iphone 6 plus"], "iphone 6": ["iphone 6"], "iphone 5s/se": ["iphone 5s", "iphone se antigo", "iphone se 1", "5s/se"], "iphone 5c": ["iphone 5c"], "iphone 5": ["iphone 5"]}, "items_by_group_model": {"bateria iphone::iphone 11": [{"group": "bateria iphone", "model": "iPhone 11", "variant": null, "service_product_id": "3ffcc3c9-68b5-d0ca-46b4-d4f58b1be39e", "service_name": "Bateria iPhone 11", "service_sku": "11443", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "bateria iphone::iphone 11 pro": [{"group": "bateria iphone", "model": "iPhone 11 Pro", "variant": null, "service_product_id": "2f4db9eb-20e6-bd8b-d288-e84d4f6fe5bd", "service_name": "Bateria iPhone 11 PRO", "service_sku": "11456", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "bateria iphone::iphone 11 pro max": [{"group": "bateria iphone", "model": "iPhone 11 Pro Max", "variant": null, "service_product_id": "d65055ed-d1f1-416c-9401-a317c31b3c9e", "service_name": "Bateria iPhone 11 PRO MAX", "service_sku": "11796", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "bateria iphone::iphone 12 mini": [{"group": "bateria iphone", "model": "iPhone 12 Mini", "variant": null, "service_product_id": "4127ee20-6289-4cda-b3bd-a1414589d15e", "service_name": "Bateria iPhone 12 Mini", "service_sku": "12360", "service_price": 250.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 349.9}], "bateria iphone::iphone 12 pro": [{"group": "bateria iphone", "model": "iPhone 12 Pro", "variant": null, "service_product_id": "ff82698a-60a9-4702-82b1-f6abae954b6f", "service_name": "Bateria iPhone 12 / 12 PRO", "service_sku": "12361", "service_price": 250.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 349.9}], "bateria iphone::iphone 12 pro max": [{"group": "bateria iphone", "model": "iPhone 12 Pro Max", "variant": null, "service_product_id": "71f89955-b4d4-4523-9ede-bd7744592bb6", "service_name": "Bateria iPhone 12 PRO MAX", "service_sku": "12411", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "bateria iphone::iphone 13": [{"group": "bateria iphone", "model": "iPhone 13", "variant": null, "service_product_id": "8475145f-d428-4499-bb66-a1ae4b598076", "service_name": "Bateria iPhone 13", "service_sku": "12730", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "bateria iphone::iphone 13 mini": [{"group": "bateria iphone", "model": "iPhone 13 Mini", "variant": null, "service_product_id": "d2bc7b7b-258f-48d6-b19e-8f04c7c616b3", "service_name": "Bateria iPhone 13 Mini", "service_sku": "12850", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "bateria iphone::iphone 13 pro": [{"group": "bateria iphone", "model": "iPhone 13 Pro", "variant": null, "service_product_id": "9811b5e6-8975-4327-b0a5-af46971bdc56", "service_name": "Bateria iPhone 13 PRO", "service_sku": "12731", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}], "bateria iphone::iphone 13 pro max": [{"group": "bateria iphone", "model": "iPhone 13 Pro Max", "variant": null, "service_product_id": "f3d68f28-d7d6-4605-9e83-17d9aa6421f0", "service_name": "Bateria iPhone 13 PRO MAX", "service_sku": "12732", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}], "bateria iphone::iphone 14": [{"group": "bateria iphone", "model": "iPhone 14", "variant": null, "service_product_id": "2c7b29e9-704d-4945-8d09-ec9904edde0b", "service_name": "Bateria iPhone 14", "service_sku": "13301", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}], "bateria iphone::iphone 14 plus": [{"group": "bateria iphone", "model": "iPhone 14 Plus", "variant": null, "service_product_id": "6ee24013-2fe4-4c89-a60a-36165f775881", "service_name": "Bateria iPhone 14 Plus", "service_sku": "13302", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}], "bateria iphone::iphone 14 pro": [{"group": "bateria iphone", "model": "iPhone 14 Pro", "variant": null, "service_product_id": "a38cdcf6-4b4b-4c5a-9b99-17c3ed0a7c74", "service_name": "Bateria iPhone 14 PRO", "service_sku": "13303", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "bateria iphone::iphone 14 pro max": [{"group": "bateria iphone", "model": "iPhone 14 Pro Max", "variant": null, "service_product_id": "20342eb4-a64c-43db-be96-3779dc80b226", "service_name": "Bateria iPhone 14 PRO MAX", "service_sku": "13304", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "bateria iphone::iphone 15": [{"group": "bateria iphone", "model": "iPhone 15", "variant": null, "service_product_id": "b1d8ffc3-b2c2-4932-b9fa-96f065f3e70a", "service_name": "Bateria iPhone 15", "service_sku": "13585", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}], "bateria iphone::iphone 15 plus": [{"group": "bateria iphone", "model": "iPhone 15 Plus", "variant": null, "service_product_id": "9f07b8af-176e-4619-b26d-39a306fbd943", "service_name": "Bateria iPhone 15 Plus", "service_sku": "13586", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}], "bateria iphone::iphone 15 pro": [{"group": "bateria iphone", "model": "iPhone 15 Pro", "variant": null, "service_product_id": "60525c84-809d-4939-91fd-a20438455196", "service_name": "Bateria iPhone 15 PRO", "service_sku": "13587", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "bateria iphone::iphone 15 pro max": [{"group": "bateria iphone", "model": "iPhone 15 Pro Max", "variant": null, "service_product_id": "1cc013ef-7a9f-40cc-b576-33a5a3726e87", "service_name": "Bateria iPhone 15 PRO MAX", "service_sku": "13588", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "bateria iphone::iphone 16": [{"group": "bateria iphone", "model": "iPhone 16", "variant": null, "service_product_id": "9ce9d8fd-8ce4-45bf-9406-0252d0ff524a", "service_name": "Bateria iPhone 16", "service_sku": "13969", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "bateria iphone::iphone 16 plus": [{"group": "bateria iphone", "model": "iPhone 16 Plus", "variant": null, "service_product_id": "1e186e53-6936-4366-b9a2-f4f3edbd30c2", "service_name": "Bateria iPhone 16 Plus", "service_sku": "13970", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "bateria iphone::iphone 16 pro": [{"group": "bateria iphone", "model": "iPhone 16 Pro", "variant": null, "service_product_id": "ab74db43-5a09-4904-aa91-290047931087", "service_name": "Bateria iPhone 16 PRO", "service_sku": "13971", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}], "bateria iphone::iphone 16 pro max": [{"group": "bateria iphone", "model": "iPhone 16 Pro Max", "variant": null, "service_product_id": "d22ad947-3ff1-46c9-ac7b-feac2bae6b63", "service_name": "Bateria iPhone 16 PRO MAX", "service_sku": "13972", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}], "bateria iphone::iphone 5": [{"group": "bateria iphone", "model": "iPhone 5", "variant": null, "service_product_id": "1f540e9f-ce65-11e3-a0f5-b8ca3a64f8f4", "service_name": "Bateria iPhone 5", "service_sku": "10082", "service_price": 120.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 219.9}], "bateria iphone::iphone 5c": [{"group": "bateria iphone", "model": "iPhone 5C", "variant": null, "service_product_id": "06430d4c-cf29-11e3-a0f5-b8ca3a64f8f4", "service_name": "Bateria iPhone 5S/5C", "service_sku": "10106", "service_price": 120.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 219.9}], "bateria iphone::iphone 6": [{"group": "bateria iphone", "model": "iPhone 6", "variant": null, "service_product_id": "47fe23b6-2838-11e5-f7b9-1447d5267ac1", "service_name": "Bateria iPhone 6", "service_sku": "10120", "service_price": 120.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 219.9}], "bateria iphone::iphone 6s": [{"group": "bateria iphone", "model": "iPhone 6S", "variant": null, "service_product_id": "0624dbcd-ef38-11e6-e0bb-9f7840d41a53", "service_name": "Bateria iPhone 6S", "service_sku": "10281", "service_price": 150.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 249.9}], "bateria iphone::iphone 6s plus": [{"group": "bateria iphone", "model": "iPhone 6S Plus", "variant": null, "service_product_id": "47fe23b6-2838-11e5-f4e4-5b129f789f30", "service_name": "Bateria iPhone 6 Plus/6S Plus", "service_sku": "10139", "service_price": 120.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 219.9}], "bateria iphone::iphone 7": [{"group": "bateria iphone", "model": "iPhone 7", "variant": null, "service_product_id": "0afa8de1-1438-11e7-edec-998d5825e78b", "service_name": "Bateria iPhone 7", "service_sku": "10502", "service_price": 150.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 249.9}], "bateria iphone::iphone 7 plus": [{"group": "bateria iphone", "model": "iPhone 7 Plus", "variant": null, "service_product_id": "c69ce360-66b7-5d17-f4b2-9bb570880e67", "service_name": "Bateria iPhone 7 Plus", "service_sku": "10693", "service_price": 150.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 249.9}], "bateria iphone::iphone 8": [{"group": "bateria iphone", "model": "iPhone 8", "variant": null, "service_product_id": "4ea70ea5-bd21-f298-bd64-4b0dc5aeebd0", "service_name": "Bateria iPhone 8", "service_sku": "10756", "service_price": 150.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 249.9}], "bateria iphone::iphone 8 plus": [{"group": "bateria iphone", "model": "iPhone 8 Plus", "variant": null, "service_product_id": "5134bd9d-36d2-06be-30c5-a941980385e2", "service_name": "Bateria iPhone 8 Plus", "service_sku": "10757", "service_price": 150.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 249.9}], "bateria iphone::iphone se": [{"group": "bateria iphone", "model": "iPhone SE", "variant": null, "service_product_id": "1ba20a93-5eaf-4f92-a06d-31956e0a3133", "service_name": "Bateria iPhone SE 2nd Geração", "service_sku": "11979", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}, {"group": "bateria iphone", "model": "iPhone SE", "variant": null, "service_product_id": "0afa8de1-1438-11e7-edec-42180adf9d0f", "service_name": "Bateria iPhone SE", "service_sku": "10436", "service_price": 150.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 249.9}], "bateria iphone::iphone se 3ª geração": [{"group": "bateria iphone", "model": "iPhone SE 3ª Geração", "variant": null, "service_product_id": "a9e594b5-e835-4eb2-9b1c-1abce961facd", "service_name": "Bateria iPhone SE 3a Geração", "service_sku": "13416", "service_price": 250.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 349.9}], "bateria iphone::iphone x": [{"group": "bateria iphone", "model": "iPhone X", "variant": null, "service_product_id": "7b1b607e-6d37-3d30-2ec2-39255065d975", "service_name": "Bateria iPhone X", "service_sku": "10923", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "bateria iphone::iphone xr": [{"group": "bateria iphone", "model": "iPhone XR", "variant": null, "service_product_id": "c634a9ee-dec1-a628-ea31-fcf083470a5b", "service_name": "Bateria iPhone XR", "service_sku": "11146", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "bateria iphone::iphone xs": [{"group": "bateria iphone", "model": "iPhone XS", "variant": null, "service_product_id": "9fa862fa-26f8-f286-2194-593f4faf0a70", "service_name": "Bateria iPhone XS", "service_sku": "11147", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "bateria iphone::iphone xs max": [{"group": "bateria iphone", "model": "iPhone XS Max", "variant": null, "service_product_id": "8bdd581c-726c-a543-b279-23dd34345de2", "service_name": "Bateria iPhone XS MAX", "service_sku": "11148", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "tela iphone::iphone 11": [{"group": "tela iphone", "model": "iPhone 11", "variant": "infinity", "service_product_id": "0b721a80-34c3-5f21-0d8d-84079bb7c35c", "service_name": "Tela iPhone 11 Infinity", "service_sku": "11167", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "tela iphone::iphone 11 pro": [{"group": "tela iphone", "model": "iPhone 11 Pro", "variant": "infinity", "service_product_id": "06fd2eb1-ae45-499b-4cd2-1af05782e0c2", "service_name": "Tela iPhone 11 PRO Infinity", "service_sku": "11454", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "tela iphone::iphone 11 pro max": [{"group": "tela iphone", "model": "iPhone 11 Pro Max", "variant": "infinity", "service_product_id": "4aa5ddbf-5dbf-2a6e-ab28-45e7e020edd1", "service_name": "Tela iPhone 11 PRO MAX Infinity", "service_sku": "11455", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "tela iphone::iphone 12 mini": [{"group": "tela iphone", "model": "iPhone 12 Mini", "variant": "infinity", "service_product_id": "4d1a9adc-f146-49ce-9ef8-f677c44aa3af", "service_name": "Tela iPhone 12 Mini Infinity", "service_sku": "12384", "service_price": 600.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 699.9}], "tela iphone::iphone 12 pro": [{"group": "tela iphone", "model": "iPhone 12 Pro", "variant": "essential", "service_product_id": "70ed1f72-f71b-4b51-82e3-d1865ff23fc5", "service_name": "Tela iPhone 12/12 Pro Essential", "service_sku": "13693", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}, {"group": "tela iphone", "model": "iPhone 12 Pro", "variant": "infinity", "service_product_id": "9efc6fb9-a750-4fa1-9805-03ccb1e93f9e", "service_name": "Tela iPhone 12 / 12 PRO Infinity", "service_sku": "12203", "service_price": 800.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 899.9}], "tela iphone::iphone 12 pro max": [{"group": "tela iphone", "model": "iPhone 12 Pro Max", "variant": "infinity", "service_product_id": "80849011-2985-47f0-9942-ba984fa5bf9f", "service_name": "Tela iPhone 12 PRO MAX Infinity", "service_sku": "12204", "service_price": 900.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 999.9}], "tela iphone::iphone 13": [{"group": "tela iphone", "model": "iPhone 13", "variant": "essential", "service_product_id": "cdd51728-e9fd-4cd9-bf1b-433c908f5868", "service_name": "Tela iPhone 13 Essential", "service_sku": "13967", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}, {"group": "tela iphone", "model": "iPhone 13", "variant": "infinity", "service_product_id": "510bc414-a764-4f26-8c1e-63d17d9326bb", "service_name": "Tela iPhone 13 Infinity", "service_sku": "12444", "service_price": 900.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 999.9}], "tela iphone::iphone 13 mini": [{"group": "tela iphone", "model": "iPhone 13 Mini", "variant": "infinity", "service_product_id": "9aae3372-2738-457f-bec5-f5963ba3371e", "service_name": "Tela iPhone 13 Mini Infinity", "service_sku": "12983", "service_price": 600.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 699.9}], "tela iphone::iphone 13 pro": [{"group": "tela iphone", "model": "iPhone 13 Pro", "variant": "infinity", "service_product_id": "9df68719-473e-4842-b198-5b5e2bad8e8d", "service_name": "Tela iPhone 13 PRO Infinity", "service_sku": "12445", "service_price": 1000.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1099.9}], "tela iphone::iphone 13 pro max": [{"group": "tela iphone", "model": "iPhone 13 Pro Max", "variant": "infinity", "service_product_id": "80732c4e-69c1-4a03-9cd0-7a099bb77ade", "service_name": "Tela iPhone 13 PRO MAX Infinity", "service_sku": "12446", "service_price": 1200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1299.9}], "tela iphone::iphone 14": [{"group": "tela iphone", "model": "iPhone 14", "variant": "essential", "service_product_id": "3139c081-24f9-44ad-8b5a-b91e5001c6a8", "service_name": "Tela iPhone 14 Essential", "service_sku": "14085", "service_price": 600.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 699.9}, {"group": "tela iphone", "model": "iPhone 14", "variant": "infinity", "service_product_id": "2d92e92e-d50f-49f5-b1ff-ac36d682a633", "service_name": "Tela iPhone 14 Infinity", "service_sku": "12623", "service_price": 900.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 999.9}], "tela iphone::iphone 14 plus": [{"group": "tela iphone", "model": "iPhone 14 Plus", "variant": "infinity", "service_product_id": "aeb2b2b5-af16-421a-953f-cf9d3c95e172", "service_name": "Tela iPhone 14 Plus Infinity", "service_sku": "12624", "service_price": 1200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1299.9}], "tela iphone::iphone 14 pro": [{"group": "tela iphone", "model": "iPhone 14 Pro", "variant": "infinity", "service_product_id": "7ae49d12-6808-4235-a623-4b555f917d89", "service_name": "Tela iPhone 14 PRO Infinity", "service_sku": "12625", "service_price": 1200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1299.9}], "tela iphone::iphone 14 pro max": [{"group": "tela iphone", "model": "iPhone 14 Pro Max", "variant": "essential", "service_product_id": "0f202d49-4379-48e6-b58b-1f7bb40077f0", "service_name": "Tela iPhone 14 PRO MAX Essential", "service_sku": "14141", "service_price": 900.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 999.9}, {"group": "tela iphone", "model": "iPhone 14 Pro Max", "variant": "infinity", "service_product_id": "5a9668ac-b8f4-40d6-935d-bc9358e8446d", "service_name": "Tela iPhone 14 PRO MAX Infinity", "service_sku": "12626", "service_price": 1400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1499.9}], "tela iphone::iphone 15": [{"group": "tela iphone", "model": "iPhone 15", "variant": "essential", "service_product_id": "ffa0776b-6a82-4ff0-ab29-35425030da52", "service_name": "Tela iPhone 15 Essential", "service_sku": "14086", "service_price": 800.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 899.9}, {"group": "tela iphone", "model": "iPhone 15", "variant": "infinity", "service_product_id": "b0e2c148-e251-4bba-87d1-47eb74bbb5c8", "service_name": "Tela iPhone 15 Infinity", "service_sku": "13399", "service_price": 1200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1299.9}], "tela iphone::iphone 15 plus": [{"group": "tela iphone", "model": "iPhone 15 Plus", "variant": "infinity", "service_product_id": "ac9733c7-f167-450c-90cd-8b4de919d556", "service_name": "Tela iPhone 15 Plus Infinity", "service_sku": "13589", "service_price": 1400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1499.9}], "tela iphone::iphone 15 pro": [{"group": "tela iphone", "model": "iPhone 15 Pro", "variant": "infinity", "service_product_id": "d43d4c40-0382-4100-add3-4b834880eed5", "service_name": "Tela iPhone 15 PRO Infinity", "service_sku": "13400", "service_price": 1300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1399.9}], "tela iphone::iphone 15 pro max": [{"group": "tela iphone", "model": "iPhone 15 Pro Max", "variant": "infinity", "service_product_id": "110a5ae2-a8ad-4667-afe2-1d16946bf637", "service_name": "Tela iPhone 15 Pro Max Infinity", "service_sku": "13401", "service_price": 1600.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1699.9}], "tela iphone::iphone 16": [{"group": "tela iphone", "model": "iPhone 16", "variant": "essential", "service_product_id": "f33486b7-8f60-4a7b-9b09-dff867ec5e5f", "service_name": "Tela iPhone 16 Essential", "service_sku": "14132", "service_price": 900.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 999.9}, {"group": "tela iphone", "model": "iPhone 16", "variant": "infinity", "service_product_id": "2f976506-c703-406f-8fa3-616b940e422f", "service_name": "Tela iPhone 16 Infinity", "service_sku": "13668", "service_price": 1200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1299.9}], "tela iphone::iphone 16 plus": [{"group": "tela iphone", "model": "iPhone 16 Plus", "variant": "infinity", "service_product_id": "0deda275-6d2d-4c2b-bd7a-1d0a2a64325a", "service_name": "Tela iPhone 16 PLUS Infinity", "service_sku": "13843", "service_price": 1600.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1699.9}], "tela iphone::iphone 16 pro": [{"group": "tela iphone", "model": "iPhone 16 Pro", "variant": "infinity", "service_product_id": "92acf34f-5f6a-4a2f-8c45-35aca1359f02", "service_name": "Tela iPhone 16 PRO Infinity", "service_sku": "13669", "service_price": 1600.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1699.9}], "tela iphone::iphone 16 pro max": [{"group": "tela iphone", "model": "iPhone 16 Pro Max", "variant": "infinity", "service_product_id": "ca4d5000-a258-488f-b969-031547ec3279", "service_name": "Tela iPhone 16 PRO MAX Infinity", "service_sku": "13670", "service_price": 1900.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1999.9}], "tela iphone::iphone 16e": [{"group": "tela iphone", "model": "iPhone 16E", "variant": "infinity", "service_product_id": "8e5376ab-b33b-4e0b-8f0a-ef0e9f5d6b4e", "service_name": "Tela iPhone 16E Infinity", "service_sku": "13823", "service_price": 1100.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1199.9}], "tela iphone::iphone 17": [{"group": "tela iphone", "model": "iPhone 17", "variant": "infinity", "service_product_id": "ecb1d2ec-b19f-4f20-b6a6-92511a337895", "service_name": "Tela iPhone 17 Infinity", "service_sku": "14047", "service_price": 2400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 2499.9}], "tela iphone::iphone 17 pro": [{"group": "tela iphone", "model": "iPhone 17 Pro", "variant": "infinity", "service_product_id": "015f7b90-d54f-4c71-bc2e-5c0de5a7e601", "service_name": "Tela iPhone 17 PRO Infinity", "service_sku": "14048", "service_price": 2600.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 2699.9}], "tela iphone::iphone 17 pro max": [{"group": "tela iphone", "model": "iPhone 17 Pro Max", "variant": "infinity", "service_product_id": "0c1d5271-d2a5-4bf1-9229-dd1a9b83fea8", "service_name": "Tela iPhone 17 PRO MAX Infinity", "service_sku": "14049", "service_price": 2700.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 2799.9}], "tela iphone::iphone 5": [{"group": "tela iphone", "model": "iPhone 5", "variant": null, "service_product_id": "11ebf009-ce65-11e3-a0f5-b8ca3a64f8f4", "service_name": "Tela iPhone 5", "service_sku": "10081", "service_price": 150.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 249.9}], "tela iphone::iphone 5c": [{"group": "tela iphone", "model": "iPhone 5C", "variant": null, "service_product_id": "eef8ce75-cf28-11e3-a0f5-b8ca3a64f8f4", "service_name": "Tela iPhone 5C", "service_sku": "10105", "service_price": 150.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 249.9}], "tela iphone::iphone 6": [{"group": "tela iphone", "model": "iPhone 6", "variant": null, "service_product_id": "b8ca3a6e-7238-11e4-efc6-b16856c7cd9d", "service_name": "Tela iPhone 6", "service_sku": "10096", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "tela iphone::iphone 6 plus": [{"group": "tela iphone", "model": "iPhone 6 Plus", "variant": null, "service_product_id": "47fe23b6-2838-11e5-f4e4-25ac5f67e6fa", "service_name": "Tela iPhone 6 Plus", "service_sku": "10288", "service_price": 250.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 349.9}], "tela iphone::iphone 6s": [{"group": "tela iphone", "model": "iPhone 6S", "variant": null, "service_product_id": "0a498e18-eb38-11e5-e8a3-f6a2711e21bb", "service_name": "Tela iPhone 6S", "service_sku": "10312", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "tela iphone::iphone 6s plus": [{"group": "tela iphone", "model": "iPhone 6S Plus", "variant": null, "service_product_id": "0a1ba244-8638-11e6-ebc8-31707748806d", "service_name": "Tela iPhone 6S Plus", "service_sku": "10242", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "tela iphone::iphone 7": [{"group": "tela iphone", "model": "iPhone 7", "variant": null, "service_product_id": "0624dbcd-ef38-11e6-e0bb-b0211d3f36ca", "service_name": "Tela iPhone 7", "service_sku": "103014242", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "tela iphone::iphone 7 plus": [{"group": "tela iphone", "model": "iPhone 7 Plus", "variant": null, "service_product_id": "0624dbcd-ef38-11e6-e986-dcdd8e084039", "service_name": "Tela iPhone 7 Plus", "service_sku": "10362", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "tela iphone::iphone 8 plus": [{"group": "tela iphone", "model": "iPhone 8 Plus", "variant": null, "service_product_id": "bf953a19-50b7-9061-8ffb-037818348491", "service_name": "Tela iPhone 8 Plus", "service_sku": "10661", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "tela iphone::iphone air infinity": [{"group": "tela iphone", "model": "iPhone Air Infinity", "variant": "infinity", "service_product_id": "224a6bb1-37c5-4cb4-96e4-d3031e148a6e", "service_name": "Tela iPhone Air Infinity", "service_sku": "14124", "service_price": 2400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 2499.9}], "tela iphone::iphone se": [{"group": "tela iphone", "model": "iPhone SE", "variant": null, "service_product_id": "d2919e5b-ce66-11e3-a0f5-b8ca3a64f8f4", "service_name": "Tela iPhone 5S/SE", "service_sku": "10098", "service_price": 150.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 249.9}], "tela iphone::iphone se 2ª geração": [{"group": "tela iphone", "model": "iPhone SE 2ª Geração", "variant": null, "service_product_id": "b64e2af0-8cbc-3288-253e-4abea280d8ed", "service_name": "Tela iPhone 8 / SE 2a Geração", "service_sku": "10643", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "tela iphone::iphone se 3ª geração": [{"group": "tela iphone", "model": "iPhone SE 3ª Geração", "variant": null, "service_product_id": "455f5c33-b5f7-4cad-904e-ff6e82030a27", "service_name": "Tela iPhone SE 3a Geração", "service_sku": "14122", "service_price": 250.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 349.9}], "tela iphone::iphone x": [{"group": "tela iphone", "model": "iPhone X", "variant": "infinity", "service_product_id": "ee8299b0-72f9-92d4-c82c-2bc0e0503469", "service_name": "Tela iPhone X Infinity", "service_sku": "10780", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "tela iphone::iphone xr": [{"group": "tela iphone", "model": "iPhone XR", "variant": "infinity", "service_product_id": "934843e2-e1c8-6c11-fb45-9da5b01544a1", "service_name": "Tela iPhone XR Infinity", "service_sku": "10963", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "tela iphone::iphone xs": [{"group": "tela iphone", "model": "iPhone XS", "variant": "infinity", "service_product_id": "963ecea6-fa16-80ff-e5a9-29b915f3712a", "service_name": "Tela iPhone XS Infinity", "service_sku": "10962", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "tela iphone::iphone xs max": [{"group": "tela iphone", "model": "iPhone XS Max", "variant": "infinity", "service_product_id": "044bfc00-842a-7f8c-3dae-09b754449a34", "service_name": "Tela iPhone XS Max Infinity", "service_sku": "10961", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "traseira de vidro::iphone 11": [{"group": "traseira de vidro", "model": "iPhone 11", "variant": null, "service_product_id": "c08eee6a-7d9f-4fb9-8d62-dde96447e27f", "service_name": "Traseira de Vidro iPhone 11", "service_sku": "11734", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "traseira de vidro::iphone 11 pro": [{"group": "traseira de vidro", "model": "iPhone 11 Pro", "variant": null, "service_product_id": "d588eb5a-7e48-4ccf-8a52-6de5cf52894f", "service_name": "Traseira de Vidro iPhone 11 PRO", "service_sku": "11742", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "traseira de vidro::iphone 11 pro max": [{"group": "traseira de vidro", "model": "iPhone 11 Pro Max", "variant": null, "service_product_id": "7d7f4bf3-e88d-4158-833f-b9b92810c126", "service_name": "Traseira de Vidro iPhone 11 PRO MAX", "service_sku": "11749", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "traseira de vidro::iphone 12": [{"group": "traseira de vidro", "model": "iPhone 12", "variant": null, "service_product_id": "9b0f17f8-b074-4ec0-b1e8-9edcd2f48d20", "service_name": "Traseira de Vidro iPhone 12", "service_sku": "11873", "service_price": 250.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 349.9}], "traseira de vidro::iphone 12 mini": [{"group": "traseira de vidro", "model": "iPhone 12 Mini", "variant": null, "service_product_id": "318dfc08-99ea-477b-afd2-dde2e223e41c", "service_name": "Traseira de Vidro iPhone 12 Mini", "service_sku": "12986", "service_price": 250.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 349.9}], "traseira de vidro::iphone 12 pro": [{"group": "traseira de vidro", "model": "iPhone 12 Pro", "variant": null, "service_product_id": "c5ddf454-50a7-46fa-86bb-358d5ba7bee8", "service_name": "Traseira de Vidro iPhone 12 PRO", "service_sku": "11879", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "traseira de vidro::iphone 12 pro max": [{"group": "traseira de vidro", "model": "iPhone 12 Pro Max", "variant": null, "service_product_id": "31e9c198-7131-4a53-a2bd-688061328256", "service_name": "Traseira de Vidro iPhone 12 PRO MAX", "service_sku": "12025", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "traseira de vidro::iphone 13": [{"group": "traseira de vidro", "model": "iPhone 13", "variant": null, "service_product_id": "1a69ffb2-ec8a-4b93-b387-79e37e16762f", "service_name": "Traseira de Vidro iPhone 13", "service_sku": "12496", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "traseira de vidro::iphone 13 mini": [{"group": "traseira de vidro", "model": "iPhone 13 Mini", "variant": null, "service_product_id": "41f719a8-b9d4-4c1a-bf79-641f4f4d3648", "service_name": "Traseira de Vidro iPhone 13 Mini", "service_sku": "13210", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "traseira de vidro::iphone 13 pro": [{"group": "traseira de vidro", "model": "iPhone 13 Pro", "variant": null, "service_product_id": "3b69b690-bac6-4b2c-afbb-f53af1f3490c", "service_name": "Traseira de Vidro iPhone 13 PRO", "service_sku": "12512", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "traseira de vidro::iphone 13 pro max": [{"group": "traseira de vidro", "model": "iPhone 13 Pro Max", "variant": null, "service_product_id": "9ed7b175-544e-4ae9-aa41-b5d7e9ef1e76", "service_name": "Traseira de Vidro iPhone 13 PRO MAX", "service_sku": "12517", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "traseira de vidro::iphone 14": [{"group": "traseira de vidro", "model": "iPhone 14", "variant": null, "service_product_id": "22e9f705-298e-4da6-b70c-334fda498ba3", "service_name": "Traseira de vidro iPhone 14", "service_sku": "12671", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "traseira de vidro::iphone 14 plus": [{"group": "traseira de vidro", "model": "iPhone 14 Plus", "variant": null, "service_product_id": "37d3ca1e-9b47-4f72-989c-a0bb759d17ec", "service_name": "Traseira de vidro iPhone 14 Plus", "service_sku": "12692", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "traseira de vidro::iphone 14 pro": [{"group": "traseira de vidro", "model": "iPhone 14 Pro", "variant": null, "service_product_id": "2361a6d3-6023-4dfb-8510-5502d370fc52", "service_name": "Traseira de vidro iPhone 14 PRO", "service_sku": "12698", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}], "traseira de vidro::iphone 14 pro max": [{"group": "traseira de vidro", "model": "iPhone 14 Pro Max", "variant": null, "service_product_id": "2345d2ab-c7d5-4351-a490-f9564943d217", "service_name": "Traseira de vidro iPhone 14 PRO MAX", "service_sku": "12707", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}], "traseira de vidro::iphone 15": [{"group": "traseira de vidro", "model": "iPhone 15", "variant": null, "service_product_id": "c632e35b-331a-4741-8afc-2cd1bcf9bcc9", "service_name": "Traseira de Vidro iPhone 15", "service_sku": "13109", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}], "traseira de vidro::iphone 15 plus": [{"group": "traseira de vidro", "model": "iPhone 15 Plus", "variant": null, "service_product_id": "96dddc58-9e4a-485d-94b6-3abf35deaa33", "service_name": "Traseira de Vidro iPhone 15 Plus", "service_sku": "13110", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}], "traseira de vidro::iphone 15 pro": [{"group": "traseira de vidro", "model": "iPhone 15 Pro", "variant": null, "service_product_id": "1b7b65e5-707e-47dc-aac0-a8b13a12ca78", "service_name": "Traseira de Vidro iPhone 15 PRO", "service_sku": "13111", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}], "traseira de vidro::iphone 15 pro max": [{"group": "traseira de vidro", "model": "iPhone 15 Pro Max", "variant": null, "service_product_id": "8c8242ee-3ed9-49e4-90fa-c6447602f761", "service_name": "Traseira de Vidro iPhone 15 PRO MAX", "service_sku": "13112", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}], "traseira de vidro::iphone 16": [{"group": "traseira de vidro", "model": "iPhone 16", "variant": null, "service_product_id": "c5ea1848-9a69-4007-81be-5e86527e5972", "service_name": "Traseira de Vidro iPhone 16", "service_sku": "13651", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}], "traseira de vidro::iphone 16 plus": [{"group": "traseira de vidro", "model": "iPhone 16 Plus", "variant": null, "service_product_id": "562bf64e-e725-45d6-891b-1b76dd7f7d11", "service_name": "Traseira de Vidro iPhone 16 Plus", "service_sku": "14053", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}], "traseira de vidro::iphone 16 pro": [{"group": "traseira de vidro", "model": "iPhone 16 Pro", "variant": null, "service_product_id": "06708e50-91cd-480c-afc0-d8e1bbf0c660", "service_name": "Traseira de Vidro iPhone 16 PRO", "service_sku": "13652", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}], "traseira de vidro::iphone 16 pro max": [{"group": "traseira de vidro", "model": "iPhone 16 Pro Max", "variant": null, "service_product_id": "12a9a445-4934-4f9a-bebe-ebfe9761b6c1", "service_name": "Traseira de Vidro iPhone 16 PRO MAX", "service_sku": "13653", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}], "traseira de vidro::iphone 16e": [{"group": "traseira de vidro", "model": "iPhone 16E", "variant": null, "service_product_id": "72947836-c36c-4e82-b3ee-ea2e1b0f25e4", "service_name": "Traseira de vidro iPhone 16E", "service_sku": "14130", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}], "traseira de vidro::iphone 17": [{"group": "traseira de vidro", "model": "iPhone 17", "variant": null, "service_product_id": "3b316162-ded5-4a28-b2d4-d244a84010dd", "service_name": "Traseira de Vidro iPhone 17", "service_sku": "14138", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}], "traseira de vidro::iphone 17 pro": [{"group": "traseira de vidro", "model": "iPhone 17 Pro", "variant": null, "service_product_id": "0e056f43-7593-479e-99b4-3b60d1fc92dc", "service_name": "Traseira de Vidro iPhone 17 PRO", "service_sku": "14139", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}], "traseira de vidro::iphone 17 pro max": [{"group": "traseira de vidro", "model": "iPhone 17 Pro Max", "variant": null, "service_product_id": "52cda05c-ac72-4f8c-aada-5b0b472ddbce", "service_name": "Traseira de Vidro iPhone 17 PRO MAX", "service_sku": "14140", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}], "traseira de vidro::iphone se": [{"group": "traseira de vidro", "model": "iPhone SE", "variant": null, "service_product_id": "6adbb772-c8c4-4ae7-8386-d872628ea812", "service_name": "Traseira de Vidro iPhone 8", "service_sku": "11754", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}, {"group": "traseira de vidro", "model": "iPhone SE", "variant": null, "service_product_id": "d9f655a9-2e68-4c03-be31-c34462ffef05", "service_name": "Traseira de Vidro iPhone 8 Plus", "service_sku": "11759", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "traseira de vidro::iphone x": [{"group": "traseira de vidro", "model": "iPhone X", "variant": null, "service_product_id": "51a0e745-0470-4c34-9772-a24f341788ee", "service_name": "Traseira de Vidro iPhone X", "service_sku": "11764", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "traseira de vidro::iphone xr": [{"group": "traseira de vidro", "model": "iPhone XR", "variant": null, "service_product_id": "be1e41a5-375d-435f-8e7f-8ea675321a51", "service_name": "Traseira de Vidro iPhone XR", "service_sku": "11767", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "traseira de vidro::iphone xs": [{"group": "traseira de vidro", "model": "iPhone XS", "variant": null, "service_product_id": "54fc77f6-441c-4cf7-9610-1e5ba576403a", "service_name": "Traseira de Vidro iPhone XS", "service_sku": "11774", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "traseira de vidro::iphone xs max": [{"group": "traseira de vidro", "model": "iPhone XS Max", "variant": null, "service_product_id": "621e926b-e69f-46ce-b358-0a3a45dd8747", "service_name": "Traseira de Vidro iPhone XS MAX", "service_sku": "11778", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}]}};

// ==================== TEXT NORMALIZATION ====================
function normalizeText(text: string): string {
  let t = (text || "").toLowerCase().trim();
  const accentMap: Record<string, string> = {
    ã: "a", á: "a", â: "a", é: "e", ê: "e", í: "i",
    ó: "o", ô: "o", ú: "u", ç: "c",
  };
  for (const [from, to] of Object.entries(accentMap)) {
    t = t.replaceAll(from, to);
  }
  const replacements: Record<string, string> = {
    ifone: "iphone", ipone: "iphone", iphoni: "iphone",
    displai: "tela", diplay: "tela", display: "tela",
    baterria: "bateria", beteria: "bateria",
    trazeira: "traseira", traseia: "traseira",
    promaxx: "pro max", promax: "pro max", "pro maxx": "pro max",
  };
  for (const [old, rep] of Object.entries(replacements)) {
    t = t.replaceAll(old, rep);
  }
  const numberWords: Record<string, string> = {
    treze: "13", quatorze: "14", quinze: "15",
    dezesseis: "16", onze: "11", doze: "12",
  };
  for (const [word, num] of Object.entries(numberWords)) {
    t = t.replace(new RegExp(`\\b${word}\\b`, "g"), num);
  }
  return t;
}

// ==================== GROUP DETECTION ====================
const GROUP_PATTERNS: Record<string, RegExp[]> = {
  "tela iphone": [/\btela\b/, /\bdisplay\b/, /\bfrontal\b/],
  "bateria iphone": [/\bbateria\b/],
  "traseira de vidro": [/traseira/, /vidro traseiro/, /back glass/],
};

function detectGroup(text: string): string | null {
  const normalized = normalizeText(text);
  const hits: string[] = [];
  for (const [group, patterns] of Object.entries(GROUP_PATTERNS)) {
    if (patterns.some((p) => p.test(normalized))) hits.push(group);
  }
  return hits.length === 1 ? hits[0] : null;
}

// ==================== MODEL DETECTION ====================
function detectModel(text: string, aliases: Record<string, string[]>): string | null {
  const normalized = normalizeText(text);
  const canonicalMap: Record<string, string> = {};
  for (const k of Object.keys(aliases)) {
    canonicalMap[normalizeText(k)] = k;
  }
  const candidates: [string, number][] = [];
  for (const [canonical, values] of Object.entries(aliases)) {
    const allTerms = [canonical, ...values];
    for (const candidate of allTerms) {
      const normCandidate = normalizeText(candidate);
      const shortCandidate = normCandidate.replace("iphone ", "");
      if (normalized.includes(normCandidate) || new RegExp(`\\b${shortCandidate.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(normalized)) {
        const canonicalValue = canonicalMap[normalizeText(canonical)] || canonical;
        candidates.push([canonicalValue, normCandidate.length]);
        break;
      }
    }
  }
  if (!candidates.length) return null;
  candidates.sort((a, b) => b[1] - a[1]);
  const best = candidates[0][0];
  const sameBest = candidates.filter(([, size]) => size === candidates[0][1]).map(([c]) => c);
  if (new Set(sameBest).size === 1) return best;
  return null;
}

// ==================== QUOTE ENGINE ====================
function computeInstallments(finalPrice: number): number {
  return Math.round((finalPrice * 1.07) / 6 * 100) / 100;
}

interface QuoteResult {
  status: string;
  reason?: string;
  group?: string;
  model?: string;
  service_name?: string;
  variant?: string | null;
  final_price?: number;
  service_price?: number;
  labor_price?: number;
  installment_value_6x?: number;
  message?: string;
  variants?: Array<{ variant: string | null; service_name: string; final_price: number }>;
  action?: string;
}

function quote(message: string): QuoteResult {
  const data = lookupData as any;
  const normalizedMessage = normalizeText(message);
  const group = detectGroup(message);
  const model = detectModel(message, data.models);

  if (!group && !model) {
    return { status: "needs_clarification", reason: "missing_group_and_model", message: "Preciso saber qual serviço tu quer (tela, bateria ou traseira) e qual é o modelo do iPhone." };
  }
  if (!group) {
    return { status: "needs_clarification", reason: "missing_group", message: "Preciso confirmar o serviço: é tela, bateria ou traseira de vidro?" };
  }
  if (!model) {
    return { status: "needs_clarification", reason: "missing_model", message: "Preciso confirmar o modelo do iPhone pra te passar o valor certo." };
  }

  const key = `${group}::${model}`;
  let items = data.items_by_group_model[key] || [];

  // Fallback iPhone 12 → iPhone 12 Pro
  if (!items.length && normalizeText(model) === "iphone 12") {
    const fallbackKey = `${group}::iphone 12 pro`;
    const fallbackItems = data.items_by_group_model[fallbackKey] || [];
    if (fallbackItems.length) items = fallbackItems;
  }
  if (!items.length && group === "tela iphone" && normalizedMessage.includes("iphone 12")) {
    const fallbackItems = data.items_by_group_model["tela iphone::iphone 12 pro"] || [];
    if (fallbackItems.length) items = fallbackItems;
  }

  if (!items.length) {
    return { status: "not_found", reason: "group_model_not_found", message: "Não encontrei esse serviço para esse modelo no ERP da iHelpU." };
  }

  if (items.length === 1) {
    const item = items[0];
    const installmentValue = computeInstallments(item.final_price);
    return {
      status: "ok", group, model,
      service_name: item.service_name, variant: item.variant,
      final_price: item.final_price, service_price: item.service_price,
      labor_price: item.labor_price, installment_value_6x: installmentValue,
    };
  }

  const variants = items.map((item: any) => ({
    variant: item.variant, service_name: item.service_name, final_price: item.final_price,
  }));
  return { status: "needs_clarification", reason: "multiple_variants", group, model, variants };
}

// ==================== RUNTIME ====================
function greetingByHour(nowHour: number): string {
  if (nowHour >= 5 && nowHour <= 12) return "Bom dia";
  if (nowHour > 12 && nowHour <= 19) return "Boa tarde";
  return "Boa noite";
}

function isStoreOpen(nowHour: number): boolean {
  return nowHour >= 9 && nowHour < 18;
}

function formatModel(model: string): string {
  const parts = (model || "").split(" ");
  if (!parts.length) return model;
  return parts.map((part, i) => {
    if (i === 0 && part === "iphone") return "iPhone";
    if (["xr", "xs"].includes(part)) return part.toUpperCase();
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).join(" ");
}

function serviceAnchor(group: string): string {
  if (group === "tela iphone") {
    return "Antes de te passar as condições, gostaria de informar que neste serviço tu terá um suporte pós reparo único no estado:\n\n• Garantia vitalícia na tela — a maior do mercado e exclusividade iHelpU ✅\n\n• Reparo express, em 40 minutos! É o tempo de um cafezinho ☕️\n\n• Segurança de uma equipe certificada pela Apple para deixar teu aparelho novo, de novo! 🧡";
  }
  if (group === "bateria iphone") {
    return "Antes de te passar as condições, gostaria de informar que neste serviço tu terá um suporte pós reparo único no estado:\n\n• Garantia de 1 ano — a maior do mercado ✅\n\n• Reparo express, em 40 minutos! É o tempo de um cafezinho ☕️\n\n• Segurança de uma equipe certificada pela Apple para deixar teu aparelho novo, de novo! 🧡";
  }
  if (group === "traseira de vidro") {
    return "Antes de te passar as condições, gostaria de informar que neste serviço tu terá um suporte pós reparo único no estado:\n\n• Garantia de 1 ano — a maior do mercado ✅\n\n• Reparo no mesmo dia! Ficar muito tempo sem iPhone não dá, né?\n\n• Segurança de uma equipe certificada pela Apple para deixar teu aparelho novo, de novo! 🧡";
  }
  return "";
}

function recommendVariant(message: string): string | null {
  const text = message.toLowerCase();
  const economySignals = ["mais barato", "mais em conta", "economizar", "barato", "custo beneficio", "custo-beneficio"];
  const qualitySignals = ["melhor", "melhor qualidade", "premium", "mais original", "mais top", "qualidade"];
  if (economySignals.some((x) => text.includes(x))) return "essential";
  if (qualitySignals.some((x) => text.includes(x))) return "infinity";
  return null;
}

function getNowHour(): number {
  const now = new Date();
  const utcHour = now.getUTCHours();
  let brHour = utcHour - 3;
  if (brHour < 0) brHour += 24;
  return brHour;
}

function buildReply(message: string, opening = false, nowHour?: number) {
  const normalized = message.toLowerCase().trim();
  if (nowHour === undefined) nowHour = getNowHour();

  const greeting = greetingByHour(nowHour);
  const introOpen = `${greeting}! Tudo bem? Aqui é o Emerson da iHelpU.\n\n`;
  const introClosed = `${greeting}! Tudo bem? Aqui é o Emerson da iHelpU.\n\nAgora estamos fora do horário de atendimento da loja, mas já consigo te adiantar as informações por aqui. Assim que a loja abrir, a equipe continua contigo se precisar.\n\n`;

  const openingPrefix = () => {
    if (!opening) return "";
    return isStoreOpen(nowHour!) ? introOpen : introClosed;
  };

  const simpleGreetings = new Set(["oi", "ola", "olá", "e ai", "e aí", "fala", "opa", "bom dia", "boa tarde", "boa noite"]);
  if (simpleGreetings.has(normalized)) {
    const reply = nowHour >= 9 && nowHour < 18
      ? "E aí, tudo bem? 😊 Sou o Emerson da iHelpU. Como posso te ajudar hoje?"
      : "Oi! Sou o iHelper, assistente virtual da iHelpU 🤖 Como posso te ajudar?";
    return { status: "ok", reply, replies: [reply], action: "reply", data: { reason: "greeting" } };
  }

  let serviceHits = 0;
  if (normalized.includes("tela")) serviceHits++;
  if (normalized.includes("bateria")) serviceHits++;
  if (normalized.includes("traseira") || normalized.includes("vidro traseiro")) serviceHits++;
  if (serviceHits >= 2) {
    const reply = "Para esse tipo de atendimento com mais de um serviço, vou te encaminhar para um dos nossos técnicos que vai te dar a melhor condição 😉";
    return { status: "handoff", reply, replies: [reply], action: "handoff", data: { reason: "multiple_services" } };
  }

  if (["samsung", "motorola", "xiaomi"].some((x) => normalized.includes(x))) {
    const reply = "Hoje nós somos especialistas Apple, então infelizmente não atendemos outras marcas por aqui 🙂";
    return { status: "handoff", reply, replies: [reply], action: "handoff", data: { reason: "other_brand" } };
  }

  if (["ipad", "macbook", "mac", "apple watch"].some((x) => normalized.includes(x))) {
    const reply = isStoreOpen(nowHour)
      ? "Como esse é um caso mais específico, eu prefiro deixar teu atendimento encaminhado pra loja te orientar certinho 🙂\n\nSe tu quiser, já pode me adiantar o modelo do aparelho e explicar um pouco melhor o problema, que isso ajuda bastante quando a equipe pegar teu atendimento."
      : "Como esse é um caso mais específico, eu prefiro deixar teu atendimento encaminhado pra loja te orientar certinho 🙂\n\nSe tu quiser, já pode me adiantar o modelo do aparelho e explicar um pouco melhor o problema por aqui. Assim que a loja abrir, a equipe retorna teu contato.";
    return { status: "handoff", reply, replies: [reply], action: "handoff", data: { reason: "out_of_scope" } };
  }

  const result = quote(message);

  if (result.status === "ok") {
    const serviceLabel = (result.group || "").replace(" iphone", "");
    const openingText = openingPrefix();
    const anchor = serviceAnchor(result.group!);
    const blocks: string[] = [];
    if (openingText.trim()) blocks.push(openingText.trim());
    if (anchor) blocks.push(anchor);
    blocks.push(`Pra ${formatModel(result.model!)}, o valor da ${serviceLabel} fica em R$ ${result.final_price!.toFixed(2)} à vista.`);
    blocks.push(`Ou em até 6x de R$ ${result.installment_value_6x!.toFixed(2)}.`);
    blocks.push("Podemos seguir com agendamento do serviço?");
    return { status: "ok", reply: blocks.join("\n\n").trim(), replies: blocks, action: "reply", data: result };
  }

  if (result.status === "needs_clarification") {
    const reason = result.reason;
    let reply: string;
    let replies: string[] | undefined;

    if (reason === "missing_group") {
      reply = `${openingPrefix()}Consigo te ajudar certinho, mas preciso confirmar uma coisa primeiro: é tela, bateria ou traseira de vidro?`.trim();
    } else if (reason === "missing_model") {
      reply = `${openingPrefix()}Perfeito. Me confirma só o modelo do teu iPhone pra eu te passar o valor certo.`.trim();
    } else if (reason === "multiple_variants" && result.variants && result.variants.length >= 2) {
      const preferred = recommendVariant(message);
      const v1 = result.variants[0];
      const v2 = result.variants[1];
      const blocks: string[] = [];
      if (openingPrefix()) blocks.push(openingPrefix().trim());
      const anchor = serviceAnchor("tela iphone");
      if (anchor) blocks.push(anchor);
      blocks.push(`Pra ${formatModel(result.model || v1.service_name || "")}, temos duas opções de tela:`);
      blocks.push(`• Essential → opção mais econômica\nR$ ${v1.final_price.toFixed(2)} à vista\nou em até 6x de R$ ${((v1.final_price * 1.07) / 6).toFixed(2)}`);
      blocks.push(`• Infinity → opção de melhor qualidade\nR$ ${v2.final_price.toFixed(2)} à vista\nou em até 6x de R$ ${((v2.final_price * 1.07) / 6).toFixed(2)}`);
      blocks.push("Se tu quiser, eu posso te explicar rapidinho a diferença entre a Essential e a Infinity.");
      if (preferred === "essential") blocks.push("Se tua prioridade for economizar, a Essential costuma fazer mais sentido 🙂");
      else if (preferred === "infinity") blocks.push("Se tua prioridade for qualidade, eu te indicaria a Infinity 🙂");
      blocks.push("Se quiser, eu já posso seguir contigo por aqui.");
      reply = blocks.join("\n\n").trim();
      replies = blocks;
    } else {
      reply = `${openingPrefix()}${result.message || "Me confirma melhor o que tu precisa pra eu te ajudar certo."}`.trim();
    }
    return { status: "needs_clarification", reply, replies: replies || [reply], action: "reply", data: result };
  }

  if (result.status === "not_found") {
    const reply = isStoreOpen(nowHour)
      ? `${openingPrefix()}Não encontrei esse serviço pra esse modelo no catálogo da iHelpU. Vou deixar isso encaminhado pra loja te orientar certinho 🙂\n\nSe tu quiser, já pode me explicar um pouco melhor o que aconteceu com o aparelho, que isso ajuda quando a equipe assumir o atendimento.`.trim()
      : `${openingPrefix()}Não encontrei esse serviço pra esse modelo no catálogo da iHelpU. Vou deixar teu atendimento encaminhado 🙂\n\nSe tu quiser, já pode me adiantar um pouco melhor o problema e o modelo do aparelho, que assim que a loja abrir a equipe retorna teu contato.`.trim();
    return { status: "handoff", reply, replies: [reply], action: "handoff", data: result };
  }

  return {
    status: "handoff",
    reply: "Esse caso eu prefiro encaminhar pra loja te orientar certinho, pra não te passar algo errado.",
    replies: ["Esse caso eu prefiro encaminhar pra loja te orientar certinho, pra não te passar algo errado."],
    action: "handoff",
    data: result,
  };
}

// ==================== SCHEDULING ====================
function parseHour(text: string): string | null {
  const t = (text || "").toLowerCase();
  const m = t.match(/\b(\d{1,2})(?::|h)?(\d{2})?\b/);
  if (!m) return null;
  const hh = parseInt(m[1]);
  const mm = parseInt(m[2] || "0");
  if (hh > 23 || mm > 59) return null;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function isTimeAllowed(group: string, timeHhmm: string, openHour = 9, closeHour = 18): [boolean, string | null] {
  const [hh, mm] = timeHhmm.split(":").map(Number);
  const minutes = hh * 60 + mm;
  const openM = openHour * 60;
  const closeM = closeHour * 60;

  if (group === "tela iphone" || group === "bateria iphone") {
    const latest = closeM - 40;
    if (minutes < openM || minutes > latest) {
      const lh = String(Math.floor(latest / 60)).padStart(2, "0");
      const lm = String(latest % 60).padStart(2, "0");
      return [false, `Pra ${group.replace(" iphone", "")}, o último horário disponível é ${lh}:${lm}.`];
    }
    return [true, null];
  }

  if (group === "traseira de vidro") {
    if (minutes <= 12 * 60) return [true, "Perfeito — deixando até 12:00, a previsão é ficar pronto no mesmo dia."];
    return [true, "Perfeito — como a entrega será depois de 12:00, a previsão é ficar pronto no dia seguinte."];
  }

  return [true, null];
}

function buildScheduleReply(name: string, cpf: string | null, preferredTimeText: string, quoteData: any) {
  const timeHhmm = parseHour(preferredTimeText);
  if (!timeHhmm) {
    return { status: "needs_clarification", reply: "Perfeito 😊 Me confirma só o horário no formato que fica melhor pra ti, por exemplo 10h, 14h30 ou 17:00.", replies: ["Perfeito 😊 Me confirma só o horário no formato que fica melhor pra ti, por exemplo 10h, 14h30 ou 17:00."] };
  }

  const [allowed, note] = isTimeAllowed(quoteData.group, timeHhmm);
  if (!allowed) {
    const reply = `Perfeito 😊 ${note} Se tu quiser, me diz um horário dentro dessa janela que eu deixo encaminhado.`;
    return { status: "needs_clarification", reply, replies: [reply] };
  }

  const storeName = "iHelpU Unidade do canal";
  const storeAddress = "[endereço da loja do canal]";
  const model = formatModel(quoteData.model || "");
  const lines = [
    "Perfeito 😊", "",
    "Então teu atendimento fica encaminhado assim:", "",
    `• Nome: ${name}`,
  ];
  if (cpf) lines.push(`• CPF: ${cpf}`);
  lines.push(
    `• Serviço: ${(quoteData.group || "").replace(" iphone", "")} do ${model}`,
    `• Valor confirmado: R$ ${Number(quoteData.final_price).toFixed(2)} à vista`,
    `• Horário solicitado: ${timeHhmm}`,
    `• Loja: ${storeName}`,
    `• Endereço: ${storeAddress}`,
  );
  let confirmation = lines.join("\n");
  if (note) confirmation = `${note}\n\n${confirmation}`;
  return { status: "ok", reply: confirmation, replies: [confirmation] };
}

// ==================== HTTP HANDLER ====================
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.pathname.split("/").pop() || "";

  try {
    if (req.method === "GET" && (path === "health" || path === "brain")) {
      const nowHour = getNowHour();
      return new Response(JSON.stringify({
        ok: true, version: "iHelpURobotBrain/0.2-edge",
        timestamp: new Date().toISOString(), hour_br: nowHour,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (req.method === "POST") {
      const data = await req.json();

      if (path === "think" || path === "brain") {
        const message = data.message || "";
        if (!message) {
          return new Response(JSON.stringify({ ok: false, error: "missing_message" }), {
            status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const result = buildReply(message);
        return new Response(JSON.stringify({
          ok: true,
          replies: result.replies || [result.reply],
          data: result.data || {},
          action: result.action || "reply",
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (path === "schedule") {
        const { name, cpf, time, quote_data } = data;
        if (!name || !time || !quote_data) {
          return new Response(JSON.stringify({ ok: false, error: "missing_fields" }), {
            status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        const result = buildScheduleReply(name, cpf || null, time, quote_data);
        return new Response(JSON.stringify({
          ok: true, replies: result.replies || [result.reply],
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const message = data.message || "";
      if (message) {
        const result = buildReply(message);
        return new Response(JSON.stringify({
          ok: true,
          replies: result.replies || [result.reply],
          data: result.data || {},
          action: result.action || "reply",
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    return new Response(JSON.stringify({ ok: false, error: "not_found" }), {
      status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (exc) {
    return new Response(JSON.stringify({ ok: false, error: "internal_error", detail: String(exc) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
