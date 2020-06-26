<?php

namespace App\Dto;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *      collectionOperations={
 *          "post"={
 *              "path"="/users/reset-password/code/validation",
 *          },
 *      },
 *      itemOperations={},
 * )
 */

final class ResetPasswordCodeValidation
{
    /**
     * @Assert\NotBlank(message="le code ne peut pas être vide")
     * @Assert\NotNull(message="le code ne peut pas être null")
     * @Assert\Type(type="integer", message="le code doit être entier")
     * @Assert\Length(min=6, max=6)
     */
    public $resetPasswordCode;
    
   
}