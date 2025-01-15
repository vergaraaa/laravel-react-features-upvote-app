<?php

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UpvoteController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['verified', 'role:' . RolesEnum::Admin->value])->group(function () {
        Route::get('/users', [UserController::class, 'index'])
            ->name('users.index');

        Route::get('/users/{user}/edit', [UserController::class, 'edit'])
            ->name('users.edit');

        Route::put('/users/{user}', [UserController::class, 'update'])
            ->name('users.update');
    });

    Route::middleware([
        'verified',
        sprintf(
            'role:%s|%s|%s',
            RolesEnum::User->value,
            RolesEnum::Commenter->value,
            RolesEnum::Admin->value
        )
    ])->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');

        Route::resource('/features', FeatureController::class)
            ->except(['index', 'show'])
            ->middleware('can:' . PermissionsEnum::ManageFeatures->value);

        Route::get('/features', [FeatureController::class, 'index'])
            ->name('features.index');

        Route::get('/features/{feature}', [FeatureController::class, 'show'])
            ->name('features.show');


        Route::post('/feature/{feature}/upvote', [UpvoteController::class, 'store'])
            ->name('upvote.store');

        Route::delete('/upvote/{feature}', [UpvoteController::class, 'destroy'])
            ->name('upvote.destroy');


        Route::post('/feature/{feature}/comments', [CommentController::class, 'store'])
            ->middleware('can:' . PermissionsEnum::ManageComments->value)
            ->name('comment.store');

        Route::delete('/comment/{comment}', [CommentController::class, 'destroy'])
            ->middleware('can:' . PermissionsEnum::ManageComments->value)
            ->name('comment.destroy');
    });
});

require __DIR__ . '/auth.php';
