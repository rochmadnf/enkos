<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use App\Http\Requests\Finance\CashFlowCategoryRequest;
use App\Http\Resources\Finance\CashFlowCategoryResource;
use App\Models\Finance\CashFlowCategory;
use Illuminate\Support\Arr;

class CashFlowCategoryController extends Controller
{
    protected int $defaultPerPage = 10;

    public function index()
    {
        $pageName = 'Kategori Arus Kas';


        $records = CashFlowCategoryResource::collection(
            CashFlowCategory::query()
                ->orderBy('name', 'asc')
                ->paginate(request()->input('per_page', $this->defaultPerPage))
        );

        return inertia('features/cash-flow/category/index', [
            'page' => [
                'uuid' => 'mni_006',
                'name' => $pageName,
                'description' => 'Menampilkan seluruh kategori untuk arus kas.',
            ],
            'resources' => $records,
        ]);
    }

    public function store(CashFlowCategoryRequest $request)
    {
        $validatedData = $request->validated();

        $category = CashFlowCategory::create(Arr::except($validatedData, ['id']));

        return redirect()->back()->with('success', 'Kategori arus kas berhasil ditambahkan.');
    }

    public function update(CashFlowCategoryRequest $request, int $id)
    {
        $validatedData = $request->validated();

        $category = CashFlowCategory::findOrFail($id);
        $category->update($validatedData);

        return redirect()->back()->with('success', 'Kategori arus kas berhasil diperbarui.');
    }

    public function destroy(int $id)
    {
        $category = CashFlowCategory::findOrFail($id);
        $category->delete();

        return redirect()->back()->with('success', 'Kategori arus kas berhasil dihapus.');
    }
}
