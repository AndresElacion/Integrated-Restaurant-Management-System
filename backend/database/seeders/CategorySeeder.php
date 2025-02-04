<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // php artisan db:seed --class=CategorySeeder
        Category::create([
            'name' => 'hot_dishes',
        ]);

        Category::create([
            'name' => 'cold_dishes',
        ]);

        Category::create([
            'name' => 'soup',
        ]);

        Category::create([
            'name' => 'grill',
        ]);

        Category::create([
            'name' => 'dessert',
        ]);
    }
}