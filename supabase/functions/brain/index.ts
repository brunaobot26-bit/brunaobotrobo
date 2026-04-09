import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ==================== LOOKUP DATA ====================
const lookupData: any = {"labor_item": {"product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "name": "Mão de Obra", "sku": "10681", "price_including_tax": 99.9, "tag_ids": ["76510b18-468a-4fc8-8159-cef6743b8f9c"], "item_type": "labor"}, "groups": {"tela iphone": ["tela", "display", "frontal"], "bateria iphone": ["bateria"], "traseira de vidro": ["traseira", "traseira de vidro", "vidro traseiro", "back glass"]}, "models": {"iphone se 2ª geração": ["iphone se 2", "iphone se 2020", "se 2", "se 2a geração"], "iphone se 3ª geração": ["iphone se 3", "iphone se 2022", "se 3", "se 3a geração"], "iphone xs max": ["iphone xsmax", "xs max"], "iphone xs": ["iphone xs"], "iphone xr": ["iphone xr"], "iphone x": ["iphone x"], "iphone 11 pro max": ["iphone 11 pro max"], "iphone 11 pro": ["iphone 11 pro"], "iphone 11": ["iphone 11"], "iphone 12 pro max": ["iphone 12 pro max"], "iphone 12 pro": ["iphone 12 pro"], "iphone 12 mini": ["iphone 12 mini"], "iphone 12": ["iphone 12"], "iphone 13 pro max": ["iphone 13 pro max"], "iphone 13 pro": ["iphone 13 pro"], "iphone 13 mini": ["iphone 13 mini"], "iphone 13": ["iphone 13"], "iphone 14 pro max": ["iphone 14 pro max"], "iphone 14 pro": ["iphone 14 pro"], "iphone 14 plus": ["iphone 14 plus"], "iphone 14": ["iphone 14"], "iphone 15 pro max": ["iphone 15 pro max"], "iphone 15 pro": ["iphone 15 pro"], "iphone 15 plus": ["iphone 15 plus"], "iphone 15": ["iphone 15"], "iphone 16 pro max": ["iphone 16 pro max"], "iphone 16 pro": ["iphone 16 pro"], "iphone 16 plus": ["iphone 16 plus"], "iphone 16": ["iphone 16"], "iphone 16e": ["iphone 16e"], "iphone 17 pro max": ["iphone 17 pro max"], "iphone 17 pro": ["iphone 17 pro"], "iphone 17": ["iphone 17"], "iphone air": ["iphone air"], "iphone 8 plus": ["iphone 8 plus"], "iphone 8": ["iphone 8"], "iphone 7 plus": ["iphone 7 plus"], "iphone 7": ["iphone 7"], "iphone 6s plus": ["iphone 6s plus"], "iphone 6s": ["iphone 6s"], "iphone 6 plus": ["iphone 6 plus"], "iphone 6": ["iphone 6"], "iphone 5s/se": ["iphone 5s", "iphone se antigo", "iphone se 1", "5s/se"], "iphone 5c": ["iphone 5c"], "iphone 5": ["iphone 5"]}, "items_by_group_model": {"bateria iphone::iphone 11": [{"group": "bateria iphone", "model": "iPhone 11", "variant": null, "service_product_id": "3ffcc3c9-68b5-d0ca-46b4-d4f58b1be39e", "service_name": "Bateria iPhone 11", "service_sku": "11443", "service_price": 200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 299.9}], "bateria iphone::iphone 11 pro": [{"group": "bateria iphone", "model": "iPhone 11 Pro", "variant": null, "service_product_id": "2f4db9eb-20e6-bd8b-d288-e84d4f6fe5bd", "service_name": "Bateria iPhone 11 PRO", "service_sku": "11456", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "bateria iphone::iphone 11 pro max": [{"group": "bateria iphone", "model": "iPhone 11 Pro Max", "variant": null, "service_product_id": "d65055ed-d1f1-416c-9401-a317c31b3c9e", "service_name": "Bateria iPhone 11 PRO MAX", "service_sku": "11796", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "bateria iphone::iphone 12 mini": [{"group": "bateria iphone", "model": "iPhone 12 Mini", "variant": null, "service_product_id": "4127ee20-6289-4cda-b3bd-a1414589d15e", "service_name": "Bateria iPhone 12 Mini", "service_sku": "12360", "service_price": 250.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 349.9}], "bateria iphone::iphone 12 pro": [{"group": "bateria iphone", "model": "iPhone 12 Pro", "variant": null, "service_product_id": "ff82698a-60a9-4702-82b1-f6abae954b6f", "service_name": "Bateria iPhone 12 / 12 PRO", "service_sku": "12361", "service_price": 250.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 349.9}], "bateria iphone::iphone 12 pro max": [{"group": "bateria iphone", "model": "iPhone 12 Pro Max", "variant": null, "service_product_id": "71f89955-b4d4-4523-9ede-bd7744592bb6", "service_name": "Bateria iPhone 12 PRO MAX", "service_sku": "12411", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "bateria iphone::iphone 13": [{"group": "bateria iphone", "model": "iPhone 13", "variant": null, "service_product_id": "8475145f-d428-4499-bb66-a1ae4b598076", "service_name": "Bateria iPhone 13", "service_sku": "12730", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "bateria iphone::iphone 13 mini": [{"group": "bateria iphone", "model": "iPhone 13 Mini", "variant": null, "service_product_id": "d2bc7b7b-258f-48d6-b19e-8f04c7c616b3", "service_name": "Bateria iPhone 13 Mini", "service_sku": "12850", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "bateria iphone::iphone 13 pro": [{"group": "bateria iphone", "model": "iPhone 13 Pro", "variant": null, "service_product_id": "9811b5e6-8975-4327-b0a5-af46971bdc56", "service_name": "Bateria iPhone 13 PRO", "service_sku": "12731", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}], "bateria iphone::iphone 13 pro max": [{"group": "bateria iphone", "model": "iPhone 13 Pro Max", "variant": null, "service_product_id": "f3d68f28-d7d6-4605-9e83-17d9aa6421f0", "service_name": "Bateria iPhone 13 PRO MAX", "service_sku": "12732", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}], "bateria iphone::iphone 14": [{"group": "bateria iphone", "model": "iPhone 14", "variant": null, "service_product_id": "2c7b29e9-704d-4945-8d09-ec9904edde0b", "service_name": "Bateria iPhone 14", "service_sku": "13301", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}], "bateria iphone::iphone 14 plus": [{"group": "bateria iphone", "model": "iPhone 14 Plus", "variant": null, "service_product_id": "6ee24013-2fe4-4c89-a60a-36165f775881", "service_name": "Bateria iPhone 14 Plus", "service_sku": "13302", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}], "bateria iphone::iphone 14 pro": [{"group": "bateria iphone", "model": "iPhone 14 Pro", "variant": null, "service_product_id": "a38cdcf6-4b4b-4c5a-9b99-17c3ed0a7c74", "service_name": "Bateria iPhone 14 PRO", "service_sku": "13303", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "bateria iphone::iphone 14 pro max": [{"group": "bateria iphone", "model": "iPhone 14 Pro Max", "variant": null, "service_product_id": "20342eb4-a64c-43db-be96-3779dc80b226", "service_name": "Bateria iPhone 14 PRO MAX", "service_sku": "13304", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "bateria iphone::iphone 15": [{"group": "bateria iphone", "model": "iPhone 15", "variant": null, "service_product_id": "b1d8ffc3-b2c2-4932-b9fa-96f065f3e70a", "service_name": "Bateria iPhone 15", "service_sku": "13585", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}], "bateria iphone::iphone 15 plus": [{"group": "bateria iphone", "model": "iPhone 15 Plus", "variant": null, "service_product_id": "9f07b8af-176e-4619-b26d-39a306fbd943", "service_name": "Bateria iPhone 15 Plus", "service_sku": "13586", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}], "bateria iphone::iphone 15 pro": [{"group": "bateria iphone", "model": "iPhone 15 Pro", "variant": null, "service_product_id": "60525c84-809d-4939-91fd-a20438455196", "service_name": "Bateria iPhone 15 PRO", "service_sku": "13587", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "bateria iphone::iphone 15 pro max": [{"group": "bateria iphone", "model": "iPhone 15 Pro Max", "variant": null, "service_product_id": "1cc013ef-7a9f-40cc-b576-33a5a3726e87", "service_name": "Bateria iPhone 15 PRO MAX", "service_sku": "13588", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "bateria iphone::iphone 16": [{"group": "bateria iphone", "model": "iPhone 16", "variant": null, "service_product_id": "9ce9d8fd-8ce4-45bf-9406-0252d0ff524a", "service_name": "Bateria iPhone 16", "service_sku": "13969", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "bateria iphone::iphone 16 plus": [{"group": "bateria iphone", "model": "iPhone 16 Plus", "variant": null, "service_product_id": "32304bb2-08e6-44b2-a84e-78a89a5e1b90", "service_name": "Bateria iPhone 16 Plus", "service_sku": "13970", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "bateria iphone::iphone 16 pro": [{"group": "bateria iphone", "model": "iPhone 16 Pro", "variant": null, "service_product_id": "d2f7b7f2-d01e-4ab2-b82e-a3e3a71f8413", "service_name": "Bateria iPhone 16 PRO", "service_sku": "13971", "service_price": 450.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 549.9}], "bateria iphone::iphone 16 pro max": [{"group": "bateria iphone", "model": "iPhone 16 Pro Max", "variant": null, "service_product_id": "40a2e1ff-31ad-44f9-b3ac-f62a4d9a20c4", "service_name": "Bateria iPhone 16 PRO MAX", "service_sku": "13972", "service_price": 450.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 549.9}], "tela iphone::iphone 11": [{"group": "tela iphone", "model": "iPhone 11", "variant": "essential", "service_product_id": "be2f1f93-c19e-46af-b1c3-14e20b24da7e", "service_name": "Tela iPhone 11 Essential", "service_sku": "11350", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}, {"group": "tela iphone", "model": "iPhone 11", "variant": "infinity", "service_product_id": "1fc62afe-ca4d-45fd-b5bc-7b2e3eef1b52", "service_name": "Tela iPhone 11 Infinity", "service_sku": "11349", "service_price": 450.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 549.9}], "tela iphone::iphone 11 pro": [{"group": "tela iphone", "model": "iPhone 11 Pro", "variant": "essential", "service_product_id": "9a8fa3ac-e84e-4fc0-a8db-ffc46e4e12da", "service_name": "Tela iPhone 11 PRO Essential", "service_sku": "11457", "service_price": 550.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 649.9}, {"group": "tela iphone", "model": "iPhone 11 Pro", "variant": "infinity", "service_product_id": "38eff07b-bb1a-409f-b6a8-8e6b3a97b0a1", "service_name": "Tela iPhone 11 PRO Infinity", "service_sku": "11458", "service_price": 700.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 799.9}], "tela iphone::iphone 11 pro max": [{"group": "tela iphone", "model": "iPhone 11 Pro Max", "variant": "essential", "service_product_id": "c6b0ad0c-3a5d-453b-b903-aa9cdf4f5cd4", "service_name": "Tela iPhone 11 PRO MAX Essential", "service_sku": "11459", "service_price": 550.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 649.9}, {"group": "tela iphone", "model": "iPhone 11 Pro Max", "variant": "infinity", "service_product_id": "d6b27bf3-3e0e-49c9-9e6b-0d3dcb1c3e0b", "service_name": "Tela iPhone 11 PRO MAX Infinity", "service_sku": "11460", "service_price": 700.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 799.9}], "tela iphone::iphone 12 mini": [{"group": "tela iphone", "model": "iPhone 12 Mini", "variant": "essential", "service_product_id": "a7bc5e39-cb2b-4d60-858a-2bb3c4d65c2f", "service_name": "Tela iPhone 12 Mini Essential", "service_sku": "12362", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}, {"group": "tela iphone", "model": "iPhone 12 Mini", "variant": "infinity", "service_product_id": "e6c26a2e-3fe0-4c08-a5c1-5d5e4d0f6e7a", "service_name": "Tela iPhone 12 Mini Infinity", "service_sku": "12363", "service_price": 550.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 649.9}], "tela iphone::iphone 12 pro": [{"group": "tela iphone", "model": "iPhone 12 Pro", "variant": "essential", "service_product_id": "b8cd6f4a-dc3c-4e71-969b-3cc4d5e76d3f", "service_name": "Tela iPhone 12/12 PRO Essential", "service_sku": "12364", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}, {"group": "tela iphone", "model": "iPhone 12 Pro", "variant": "infinity", "service_product_id": "f9de7053-ed4d-4f82-a7ac-4dd5e6f87e40", "service_name": "Tela iPhone 12/12 PRO Infinity", "service_sku": "12365", "service_price": 600.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 699.9}], "tela iphone::iphone 12 pro max": [{"group": "tela iphone", "model": "iPhone 12 Pro Max", "variant": "essential", "service_product_id": "c9ef8164-fe5e-4093-b8bd-5ee6f7098f51", "service_name": "Tela iPhone 12 PRO MAX Essential", "service_sku": "12366", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}, {"group": "tela iphone", "model": "iPhone 12 Pro Max", "variant": "infinity", "service_product_id": "da008275-0f6f-41a4-c9ce-6ff708ba9062", "service_name": "Tela iPhone 12 PRO MAX Infinity", "service_sku": "12367", "service_price": 700.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 799.9}], "tela iphone::iphone 13 mini": [{"group": "tela iphone", "model": "iPhone 13 Mini", "variant": "essential", "service_product_id": "eb119386-1070-42b5-dadf-70087dc0ab73", "service_name": "Tela iPhone 13 Mini Essential", "service_sku": "12853", "service_price": 450.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 549.9}, {"group": "tela iphone", "model": "iPhone 13 Mini", "variant": "infinity", "service_product_id": "fc22a497-2181-43c6-ebf0-8119ce1bc84", "service_name": "Tela iPhone 13 Mini Infinity", "service_sku": "12854", "service_price": 600.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 699.9}], "tela iphone::iphone 13": [{"group": "tela iphone", "model": "iPhone 13", "variant": "essential", "service_product_id": "0d33b5a8-3292-44d7-fc01-9230de2cd95", "service_name": "Tela iPhone 13 Essential", "service_sku": "12733", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}, {"group": "tela iphone", "model": "iPhone 13", "variant": "infinity", "service_product_id": "1e44c6b9-4303-45e8-0d12-a341ef3de06", "service_name": "Tela iPhone 13 Infinity", "service_sku": "12734", "service_price": 700.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 799.9}], "tela iphone::iphone 13 pro": [{"group": "tela iphone", "model": "iPhone 13 Pro", "variant": "essential", "service_product_id": "2f55d7ca-5414-46f9-1e23-b452f04ef17", "service_name": "Tela iPhone 13 PRO Essential", "service_sku": "12735", "service_price": 550.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 649.9}, {"group": "tela iphone", "model": "iPhone 13 Pro", "variant": "infinity", "service_product_id": "3066e8db-6525-470a-2f34-c563015f028", "service_name": "Tela iPhone 13 PRO Infinity", "service_sku": "12736", "service_price": 800.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 899.9}], "tela iphone::iphone 13 pro max": [{"group": "tela iphone", "model": "iPhone 13 Pro Max", "variant": "essential", "service_product_id": "4177f9ec-7636-481b-3045-d674126f139", "service_name": "Tela iPhone 13 PRO MAX Essential", "service_sku": "12737", "service_price": 550.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 649.9}, {"group": "tela iphone", "model": "iPhone 13 Pro Max", "variant": "infinity", "service_product_id": "5288009d-8747-492c-4156-e78523700", "service_name": "Tela iPhone 13 PRO MAX Infinity", "service_sku": "12738", "service_price": 900.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 999.9}], "tela iphone::iphone 14": [{"group": "tela iphone", "model": "iPhone 14", "variant": "essential", "service_product_id": "63990bae-9858-4a3d-5267-f89634811", "service_name": "Tela iPhone 14 Essential", "service_sku": "13305", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}, {"group": "tela iphone", "model": "iPhone 14", "variant": "infinity", "service_product_id": "74aa1cbf-a969-4b4e-6378-09a745922", "service_name": "Tela iPhone 14 Infinity", "service_sku": "13306", "service_price": 750.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 849.9}], "tela iphone::iphone 14 plus": [{"group": "tela iphone", "model": "iPhone 14 Plus", "variant": "essential", "service_product_id": "85bb2dc0-ba7a-4c5f-7489-1ab856a33", "service_name": "Tela iPhone 14 Plus Essential", "service_sku": "13307", "service_price": 550.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 649.9}, {"group": "tela iphone", "model": "iPhone 14 Plus", "variant": "infinity", "service_product_id": "96cc3ed1-cb8b-4d60-8590-2bc967b44", "service_name": "Tela iPhone 14 Plus Infinity", "service_sku": "13308", "service_price": 800.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 899.9}], "tela iphone::iphone 14 pro": [{"group": "tela iphone", "model": "iPhone 14 Pro", "variant": "essential", "service_product_id": "a7dd4fe2-dc9c-4e71-9601-3cda78c55", "service_name": "Tela iPhone 14 PRO Essential", "service_sku": "13309", "service_price": 700.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 799.9}, {"group": "tela iphone", "model": "iPhone 14 Pro", "variant": "infinity", "service_product_id": "b8ee500f3-edab-4f82-a712-4deb89d66", "service_name": "Tela iPhone 14 PRO Infinity", "service_sku": "13310", "service_price": 1000.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1099.9}], "tela iphone::iphone 14 pro max": [{"group": "tela iphone", "model": "iPhone 14 Pro Max", "variant": "essential", "service_product_id": "c9ff6114-febc-4093-b823-5efc9ae77", "service_name": "Tela iPhone 14 PRO MAX Essential", "service_sku": "13311", "service_price": 750.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 849.9}, {"group": "tela iphone", "model": "iPhone 14 Pro Max", "variant": "infinity", "service_product_id": "da007225-0fcd-41a4-c934-6f0dabe88", "service_name": "Tela iPhone 14 PRO MAX Infinity", "service_sku": "13312", "service_price": 1100.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1199.9}], "tela iphone::iphone 15": [{"group": "tela iphone", "model": "iPhone 15", "variant": "essential", "service_product_id": "eb118336-1fde-42b5-da4f-7009be1b99", "service_name": "Tela iPhone 15 Essential", "service_sku": "13589", "service_price": 600.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 699.9}, {"group": "tela iphone", "model": "iPhone 15", "variant": "infinity", "service_product_id": "fc229447-20ef-43c6-eb50-811ace2caa", "service_name": "Tela iPhone 15 Infinity", "service_sku": "13590", "service_price": 900.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 999.9}], "tela iphone::iphone 15 plus": [{"group": "tela iphone", "model": "iPhone 15 Plus", "variant": "essential", "service_product_id": "0d33a558-3100-44d7-fc61-923bde3cdbb", "service_name": "Tela iPhone 15 Plus Essential", "service_sku": "13591", "service_price": 650.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 749.9}, {"group": "tela iphone", "model": "iPhone 15 Plus", "variant": "infinity", "service_product_id": "1e44b669-4211-45e8-0d72-a342ef4decc", "service_name": "Tela iPhone 15 Plus Infinity", "service_sku": "13592", "service_price": 1000.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1099.9}], "tela iphone::iphone 15 pro": [{"group": "tela iphone", "model": "iPhone 15 Pro", "variant": "essential", "service_product_id": "2f55c77a-5322-46f9-1e83-b453f05efdd", "service_name": "Tela iPhone 15 PRO Essential", "service_sku": "13593", "service_price": 800.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 899.9}, {"group": "tela iphone", "model": "iPhone 15 Pro", "variant": "infinity", "service_product_id": "3066d88b-6433-470a-2f94-c564016feee", "service_name": "Tela iPhone 15 PRO Infinity", "service_sku": "13594", "service_price": 1200.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1299.9}], "tela iphone::iphone 15 pro max": [{"group": "tela iphone", "model": "iPhone 15 Pro Max", "variant": "essential", "service_product_id": "4177e99c-7544-481b-3045-d675127ffff", "service_name": "Tela iPhone 15 PRO MAX Essential", "service_sku": "13595", "service_price": 900.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 999.9}, {"group": "tela iphone", "model": "iPhone 15 Pro Max", "variant": "infinity", "service_product_id": "5288f99d-8655-492c-4116-e78624700", "service_name": "Tela iPhone 15 PRO MAX Infinity", "service_sku": "13596", "service_price": 1300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1399.9}], "tela iphone::iphone 16": [{"group": "tela iphone", "model": "iPhone 16", "variant": "essential", "service_product_id": "a1b2c3d4-1111-4aaa-aaaa-111111111101", "service_name": "Tela iPhone 16 Essential", "service_sku": "13973", "service_price": 700.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 799.9}, {"group": "tela iphone", "model": "iPhone 16", "variant": "infinity", "service_product_id": "a1b2c3d4-1111-4aaa-aaaa-111111111102", "service_name": "Tela iPhone 16 Infinity", "service_sku": "13974", "service_price": 1000.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1099.9}], "tela iphone::iphone 16 plus": [{"group": "tela iphone", "model": "iPhone 16 Plus", "variant": "essential", "service_product_id": "a1b2c3d4-1111-4aaa-aaaa-111111111103", "service_name": "Tela iPhone 16 Plus Essential", "service_sku": "13975", "service_price": 750.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 849.9}, {"group": "tela iphone", "model": "iPhone 16 Plus", "variant": "infinity", "service_product_id": "a1b2c3d4-1111-4aaa-aaaa-111111111104", "service_name": "Tela iPhone 16 Plus Infinity", "service_sku": "13976", "service_price": 1100.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1199.9}], "tela iphone::iphone 16 pro": [{"group": "tela iphone", "model": "iPhone 16 Pro", "variant": "essential", "service_product_id": "a1b2c3d4-1111-4aaa-aaaa-111111111105", "service_name": "Tela iPhone 16 PRO Essential", "service_sku": "13977", "service_price": 900.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 999.9}, {"group": "tela iphone", "model": "iPhone 16 Pro", "variant": "infinity", "service_product_id": "a1b2c3d4-1111-4aaa-aaaa-111111111106", "service_name": "Tela iPhone 16 PRO Infinity", "service_sku": "13978", "service_price": 1300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1399.9}], "tela iphone::iphone 16 pro max": [{"group": "tela iphone", "model": "iPhone 16 Pro Max", "variant": "essential", "service_product_id": "a1b2c3d4-1111-4aaa-aaaa-111111111107", "service_name": "Tela iPhone 16 PRO MAX Essential", "service_sku": "13979", "service_price": 1000.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1099.9}, {"group": "tela iphone", "model": "iPhone 16 Pro Max", "variant": "infinity", "service_product_id": "a1b2c3d4-1111-4aaa-aaaa-111111111108", "service_name": "Tela iPhone 16 PRO MAX Infinity", "service_sku": "13980", "service_price": 1500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 1599.9}], "traseira de vidro::iphone 11": [{"group": "traseira de vidro", "model": "iPhone 11", "variant": null, "service_product_id": "t11", "service_name": "Traseira de Vidro iPhone 11", "service_sku": "T11", "service_price": 250.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 349.9}], "traseira de vidro::iphone 12 pro": [{"group": "traseira de vidro", "model": "iPhone 12 Pro", "variant": null, "service_product_id": "t12p", "service_name": "Traseira de Vidro iPhone 12/12 Pro", "service_sku": "T12P", "service_price": 300.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 399.9}], "traseira de vidro::iphone 13": [{"group": "traseira de vidro", "model": "iPhone 13", "variant": null, "service_product_id": "t13", "service_name": "Traseira de Vidro iPhone 13", "service_sku": "T13", "service_price": 350.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 449.9}], "traseira de vidro::iphone 14": [{"group": "traseira de vidro", "model": "iPhone 14", "variant": null, "service_product_id": "t14", "service_name": "Traseira de Vidro iPhone 14", "service_sku": "T14", "service_price": 400.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 499.9}], "traseira de vidro::iphone 15": [{"group": "traseira de vidro", "model": "iPhone 15", "variant": null, "service_product_id": "t15", "service_name": "Traseira de Vidro iPhone 15", "service_sku": "T15", "service_price": 500.0, "labor_product_id": "33f84630-e342-1df5-cb63-7875ba8d44cf", "labor_name": "Mão de Obra", "labor_price": 99.9, "final_price": 599.9}]}};

// ==================== TEXT UTILS ====================
function normalizeText(text: string): string {
  return (text || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

// ==================== DETECTION ====================
function detectGroup(message: string): string | null {
  const norm = normalizeText(message);
  const data = lookupData as any;
  for (const [group, keywords] of Object.entries(data.groups) as [string, string[]][]) {
    for (const kw of keywords) {
      if (norm.includes(kw)) return group;
    }
  }
  return null;
}

function detectModel(message: string, models: Record<string, string[]>): string | null {
  const norm = normalizeText(message);
  const candidates: [string, number][] = [];
  for (const [model, aliases] of Object.entries(models)) {
    const allNames = [model, ...aliases];
    for (const name of allNames) {
      if (norm.includes(normalizeText(name))) {
        candidates.push([model, name.length]);
        break;
      }
    }
  }
  if (!candidates.length) return null;
  candidates.sort((a, b) => b[1] - a[1]);
  return candidates[0][0];
}

// ==================== QUOTE ENGINE ====================
function computeInstallments(finalPrice: number): number {
  return Math.round((finalPrice * 1.07) / 6 * 100) / 100;
}

function quote(service: string, model: string): any {
  const data = lookupData as any;
  const group = service.toLowerCase();
  const modelNorm = model.toLowerCase();

  const key = `${group}::${modelNorm}`;
  let items = data.items_by_group_model[key] || [];

  if (!items.length && modelNorm === "iphone 12") {
    items = data.items_by_group_model[`${group}::iphone 12 pro`] || [];
  }

  if (!items.length) {
    return { found: false, message: `Não encontrei ${service} para ${model} no catálogo.` };
  }

  if (items.length === 1) {
    const item = items[0];
    return {
      found: true, single: true,
      group, model: item.model, variant: item.variant,
      service_name: item.service_name,
      final_price: item.final_price,
      installment_6x: computeInstallments(item.final_price),
    };
  }

  return {
    found: true, single: false,
    group, model: items[0].model,
    variants: items.map((i: any) => ({
      variant: i.variant, service_name: i.service_name,
      final_price: i.final_price,
      installment_6x: computeInstallments(i.final_price),
    })),
  };
}

function listAvailableModels(): string[] {
  return Object.keys(lookupData.models);
}

function listAvailableServices(): string[] {
  return Object.keys(lookupData.groups);
}

// ==================== TIME UTILS ====================
function getNowHour(): number {
  const now = new Date();
  let brHour = now.getUTCHours() - 3;
  if (brHour < 0) brHour += 24;
  return brHour;
}

function isStoreOpen(nowHour: number): boolean {
  return nowHour >= 9 && nowHour < 18;
}

// ==================== GPT INTEGRATION ====================
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

function getGreeting(nowHour: number): string {
  if (nowHour >= 5 && nowHour < 12) return "Bom dia";
  if (nowHour >= 12 && nowHour < 19) return "Boa tarde";
  return "Boa noite";
}

function buildSystemPrompt(nowHour: number, context: any): string {
  const open = isStoreOpen(nowHour);
  const greeting = getGreeting(nowHour);
  const contactName = context.contact_first_name || "";

  const identity = open
    ? `Você é o Emerson, atendente da iHelpU. NUNCA mencione que é virtual, robô ou IA. Aja como um atendente humano.`
    : `Você é o iHelper, assistente virtual da iHelpU. A loja está FECHADA agora, mas você pode adiantar todas as informações sobre serviços e preços. Informe que a loja está fechada quando relevante.`;

  const services = listAvailableServices().join(", ");

  return `${identity}

## SUA IDENTIDADE
- ${open ? "Nome: Emerson. Não diga que é robô/virtual/IA." : "Nome: iHelper. Apresente-se como assistente virtual da iHelpU."}
- Empresa: iHelpU — assistência técnica especializada em Apple.

## HORÁRIO E SAUDAÇÃO
- Horário atual: ${nowHour}h (Brasília). Loja ${open ? "ABERTA (seg-sex 9h-18h)" : "FECHADA"}.
- Saudação correta para este horário: "${greeting}". USE ESTA SAUDAÇÃO. Não use "Bom dia" se for noite, etc.
- Regra: 05h-11h59 = Bom dia | 12h-18h59 = Boa tarde | 19h-04h59 = Boa noite.

## REGRAS DE CONVERSA
1. WhatsApp: respostas CURTAS, naturais, amigáveis. Emojis com moderação (máx 1-2 por mensagem).
2. Máximo 3 linhas por mensagem. Quebre em parágrafos curtos.
3. LEIA O HISTÓRICO COM ATENÇÃO. Se o cliente já informou algo (modelo, serviço, problema), NÃO pergunte de novo. Use a informação que já tem.
4. Se o cliente repetir algo que já disse, peça desculpa e siga em frente com a informação dele.
5. Se o cliente diz "iPhone 13" sem dizer Pro/Pro Max, entenda que é o iPhone 13 normal (não Pro, não Mini).

## FLUXO DE ATENDIMENTO
Siga esta sequência rigorosamente:

### Etapa 1: Saudação
Se o cliente manda "oi", "bom dia", etc → responda com a saudação correta do horário + pergunte como pode ajudar.

### Etapa 2: Identificar serviço
Se o cliente descreve um problema (tela quebrada, bateria ruim, vidro traseiro), VOCÊ já sabe o serviço. Não pergunte novamente.
- "tela quebrada/rachada/trincada/caiu e quebrou a tela/trocar display" → serviço: tela iphone
- "bateria não dura/bateria viciada/trocar bateria" → serviço: bateria iphone
- "vidro de trás quebrou/traseira rachada" → serviço: traseira de vidro

### Etapa 3: Identificar modelo
Se ainda não sabe o modelo, pergunte UMA VEZ: "Qual é o modelo do seu iPhone?"

### Etapa 4: Consultar preço
Assim que tiver serviço + modelo, IMEDIATAMENTE use get_quote. NÃO faça mais perguntas antes de consultar.

### Etapa 5: Apresentar orçamento
IMPORTANTE: Antes de passar os preços, SEMPRE envie primeiro a mensagem padrão do serviço (copie EXATAMENTE como está abaixo).

Para TELA (display), envie a mensagem padrão primeiro, depois os preços com a garantia específica de cada opção:
"Antes de te passar as condições, gostaria de informar que neste serviço você terá um suporte pós reparo único no estado:

•⁠  ⁠Reparo express, em 40 minutos! É o tempo de um cafezinho ☕️ 

•⁠  ⁠Segurança de uma equipe certificada pela Apple  para deixar teu aparelho novo, de novo! 🧡"

Depois envie os preços COM a garantia de cada opção:
- 🔷 *Infinity* (qualidade premium): R$ X à vista ou 6x de R$ Y — Garantia VITALÍCIA na tela ✅
- 🔶 *Essential* (ótimo custo-benefício): R$ X à vista ou 6x de R$ Y — Garantia de 1 ano ✅

Para BATERIA, envie esta mensagem EXATA primeiro:
"Antes de te passar as condições, gostaria de informar que neste serviço você terá um suporte pós reparo único no estado:

•⁠  ⁠Garantia de 1 ano - A maior do mercado ✅ 

•⁠  ⁠Reparo express, em 40 minutos! É o tempo de um cafezinho ☕️ 

•⁠  ⁠Segurança de uma equipe certificada pela Apple  para deixar teu aparelho novo, de novo! 🧡"

Depois envie o preço à vista e parcelado em 6x.

Para TRASEIRA DE VIDRO, envie esta mensagem EXATA primeiro:
"Antes de te passar as condições, gostaria de informar que neste serviço você terá um suporte pós reparo único no estado:

•⁠  ⁠Garantia de 1 ano - A maior do mercado ✅ 

•⁠  ⁠Reparo no mesmo dia! Ficar muito tempo sem iPhone não dá, né?

•⁠  ⁠Segurança de uma equipe certificada pela Apple  para deixar teu aparelho novo, de novo! 🧡"

Depois envie o preço à vista e parcelado em 6x.

### Etapa 6: Pós-orçamento
Pergunte se o cliente gostaria de agendar ou se tem alguma dúvida.

## SERVIÇOS DISPONÍVEIS
${services}

## REGRAS DE NEGÓCIO
- NUNCA invente preços. SEMPRE use get_quote.
- Só atende iPhone. Samsung, Motorola, Xiaomi → informe que não atende e deseje boa sorte.
- iPad, MacBook, Apple Watch → handoff para atendente humano.
- Múltiplos serviços ao mesmo tempo → handoff.
- Se o serviço/modelo não existe no catálogo → handoff.

## CONTEXTO DO CLIENTE
${contactName ? `Nome: ${contactName}` : "Nome: não informado"}
${context.last_quote_data ? `Último orçamento: ${JSON.stringify(context.last_quote_data)}` : "Sem orçamento anterior."}

## ANTI-PATTERNS (NUNCA FAÇA ISSO)
- NUNCA pergunte algo que o cliente já respondeu no histórico.
- NUNCA diga "Bom dia" de noite ou "Boa noite" de dia.
- NUNCA responda "não entendi" se o cliente deu info clara.
- NUNCA entre em loop perguntando a mesma coisa.
- NUNCA apresente preço sem usar get_quote primeiro.
`;
}

const tools = [
  {
    type: "function",
    function: {
      name: "get_quote",
      description: "Consulta o preço de um serviço para um modelo específico de iPhone. Use SEMPRE antes de informar qualquer preço.",
      parameters: {
        type: "object",
        properties: {
          service: {
            type: "string",
            enum: ["tela iphone", "bateria iphone", "traseira de vidro"],
            description: "O tipo de serviço solicitado",
          },
          model: {
            type: "string",
            description: "O modelo do iPhone, ex: iphone 15, iphone 14 pro max",
          },
        },
        required: ["service", "model"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "handoff_to_human",
      description: "Encaminha o atendimento para um humano. Use quando o caso foge do escopo do bot.",
      parameters: {
        type: "object",
        properties: {
          reason: {
            type: "string",
            description: "Motivo do encaminhamento",
          },
        },
        required: ["reason"],
      },
    },
  },
];

async function callGPT(messages: any[], systemPrompt: string, apiKey: string): Promise<any> {
  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      tools,
      tool_choice: "auto",
      temperature: 0.7,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("OpenAI error:", response.status, err);
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  return await response.json();
}

async function processWithGPT(
  message: string,
  history: any[],
  context: any,
  apiKey: string,
): Promise<{ replies: string[]; action: string; data: any }> {
  const nowHour = getNowHour();
  const systemPrompt = buildSystemPrompt(nowHour, context);

  // Build messages from history
  const chatMessages: any[] = [];
  for (const h of history) {
    chatMessages.push({
      role: h.role === "assistant" ? "assistant" : "user",
      content: h.text || "",
    });
  }
  // Add current message if not already in history
  if (!chatMessages.length || chatMessages[chatMessages.length - 1].content !== message) {
    chatMessages.push({ role: "user", content: message });
  }

  let result = await callGPT(chatMessages, systemPrompt, apiKey);
  let choice = result.choices?.[0];

  // Handle tool calls (up to 3 rounds)
  let rounds = 0;
  while (choice?.finish_reason === "tool_calls" && choice?.message?.tool_calls && rounds < 3) {
    rounds++;
    const toolCalls = choice.message.tool_calls;
    chatMessages.push(choice.message);

    for (const tc of toolCalls) {
      const fnName = tc.function.name;
      const args = JSON.parse(tc.function.arguments);
      let toolResult: any;

      if (fnName === "get_quote") {
        toolResult = quote(args.service, args.model);
      } else if (fnName === "handoff_to_human") {
        toolResult = { handoff: true, reason: args.reason };
      } else {
        toolResult = { error: "unknown_tool" };
      }

      chatMessages.push({
        role: "tool",
        tool_call_id: tc.id,
        content: JSON.stringify(toolResult),
      });
    }

    result = await callGPT(chatMessages, systemPrompt, apiKey);
    choice = result.choices?.[0];
  }

  const reply = choice?.message?.content || "Desculpa, tive um problema técnico. Pode repetir?";

  // Check if handoff was triggered
  let action = "reply";
  let data: any = {};

  // Check tool calls for handoff
  if (choice?.message?.tool_calls) {
    for (const tc of choice.message.tool_calls) {
      if (tc.function.name === "handoff_to_human") {
        action = "handoff";
        data = JSON.parse(tc.function.arguments);
      }
    }
  }

  // Also check if reply mentions handoff patterns
  const toolCallsInHistory = chatMessages.filter(m => m.role === "tool");
  for (const tcMsg of toolCallsInHistory) {
    try {
      const parsed = JSON.parse(tcMsg.content);
      if (parsed.handoff) {
        action = "handoff";
        data = parsed;
      }
      if (parsed.found !== undefined) {
        data = { ...data, ...parsed };
      }
    } catch { /* ignore */ }
  }

  // Split reply into multiple messages at double newlines for WhatsApp readability
  const replies = reply.split(/\n{2,}/).map((s: string) => s.trim()).filter(Boolean);

  return { replies: replies.length ? replies : [reply], action, data };
}

// ==================== FALLBACK (no API key) ====================
function fallbackReply(message: string): { replies: string[]; action: string; data: any } {
  const norm = normalizeText(message);
  const group = detectGroup(message);
  const model = detectModel(message, lookupData.models);

  if (group && model) {
    const result = quote(group, model);
    if (result.found) {
      if (result.single) {
        return {
          replies: [`O valor de ${result.service_name} fica em R$ ${result.final_price.toFixed(2)} à vista, ou em até 6x de R$ ${result.installment_6x.toFixed(2)}.`],
          action: "reply", data: result,
        };
      }
      const lines = result.variants.map((v: any) =>
        `• ${v.variant}: R$ ${v.final_price.toFixed(2)} à vista (6x R$ ${v.installment_6x.toFixed(2)})`
      );
      return {
        replies: [`Temos as seguintes opções:\n${lines.join("\n")}`],
        action: "reply", data: result,
      };
    }
    return { replies: ["Não encontrei esse serviço no catálogo. Vou encaminhar pra loja."], action: "handoff", data: {} };
  }

  return {
    replies: ["Olá! Como posso te ajudar? Somos especializados em reparo de iPhones: tela, bateria e traseira de vidro 😊"],
    action: "reply", data: {},
  };
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
      return new Response(JSON.stringify({
        ok: true, version: "iHelpURobotBrain/0.3-gpt",
        timestamp: new Date().toISOString(), hour_br: getNowHour(),
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (req.method === "POST") {
      const data = await req.json();
      const message = data.message || "";

      if (!message) {
        return new Response(JSON.stringify({ ok: false, error: "missing_message" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const history = data.history || [];
      const context = data.context || {};
      const apiKey = Deno.env.get("OPENAI_API_KEY");

      let result;
      if (apiKey) {
        try {
          result = await processWithGPT(message, history, context, apiKey);
        } catch (err) {
          console.error("GPT failed, using fallback:", err);
          result = fallbackReply(message);
        }
      } else {
        console.warn("No OPENAI_API_KEY, using fallback");
        result = fallbackReply(message);
      }

      return new Response(JSON.stringify({
        ok: true,
        replies: result.replies,
        action: result.action,
        data: result.data,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ ok: false, error: "not_found" }), {
      status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (exc) {
    console.error("Brain error:", exc);
    return new Response(JSON.stringify({ ok: false, error: "internal_error", detail: String(exc) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
